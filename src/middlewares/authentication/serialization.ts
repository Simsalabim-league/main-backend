import { ObjectId } from 'mongodb'
import { some } from 'fp-ts/Option'
import { AnyFunction } from '@utils/functions'
import { DoneFn, User } from '@src/types'
import { Connection } from '@src/database/connectDB'

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
