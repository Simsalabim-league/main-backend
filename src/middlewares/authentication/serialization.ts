import { User } from '@src/types/user'
import { AnyFunction } from '@src/utils/functions'
import { DoneFn } from '@src/types/express'
import { Connection } from '@src/database/connectDB'
import { ObjectId } from 'mongodb'
import { some } from 'fp-ts/lib/Option'

export const serializer = () => (user: User, done: AnyFunction) =>
{
    done(null, user._id)
}

export const deserializer = (db: Connection['db']) => (id: string, done: DoneFn) =>
{
    db.collection('users').findOne({ _id: new ObjectId(id) }, (err, user: User) =>
    {
        done(err, some(user))
    })
}
