import readline from 'readline'
import { connectDB, Connection } from '@src/database/connectDB'

export const configureAppExit = (client?: Connection['client']) =>
{
    async function onExit()
    {
        if (client == null)
            client = (await connectDB()).client
        await client.close()
        console.log('disconnected from db')
        process.exit(0)
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.on('close', onExit)
}

