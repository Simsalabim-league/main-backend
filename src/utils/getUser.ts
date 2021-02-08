import { Projection } from '@utils/createProjection'
import { Connection } from '@src/database/connectDB'
import { pipe } from 'fp-ts/pipeable'
import * as TE from 'fp-ts/TaskEither'
import { User } from '@src/types'
import { Either } from 'fp-ts/Either'

const exec = <T>(task: Promise<T>) => (
    TE.tryCatch(
        () => task,
        (err: Error) => err,
    )
)

export const getUser = <T extends Partial<User>>(
    query: Partial<User>,
    projection: Projection,
    db: Connection['db'],
): Promise<Either<Error, T | null>> => (
        pipe(
            exec(db.collection('users').findOne<T>(query, { projection })),
            TE.chain((user) => (
                user === null
                    ? exec(db.collection('ex-users').findOne<T>(query, { projection }))
                    : TE.right(user)
            )),
        )()
    )
