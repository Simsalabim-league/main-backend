import { MongoClient, Db } from 'mongodb'
import { once } from '@src/utils/functions'

const { DB_URL, DB_USER, DB_USER_PASS } = process.env
const url = `mongodb://${DB_USER}:${DB_USER_PASS}@${DB_URL ?? 'localhost:27017'}`

const client = new MongoClient(url, {
    useUnifiedTopology: true,
})

export interface Connection {
    db: Db;
    client: MongoClient;
}

export const connectDB = once(
    async () => new Promise<Connection>((resolve, reject) =>
    {
        client.connect((err) =>
        {
            if (err) reject(err)

            const connection: Connection = {
                db: client.db('simsalabim'),
                client,
            }
            resolve(connection)
        })
    }),
)
