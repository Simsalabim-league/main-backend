import { ObjectId } from 'mongodb'
import { createHandler } from '@src/utils'
import { Achievement } from '@src/types/achievement'
import { connectDB } from '@src/database/connectDB'

export const getAchievements = createHandler<
    { user_id: string; },
    Array<Achievement>
>(
    (req, res) => connectDB()
        .then(({ db }) => db
            .collection('achievements')
            .find<Achievement>({ user_id: new ObjectId(req.params.user_id) }, null)
            .toArray(),
        )
        .then(res.send.bind(res)),
)
