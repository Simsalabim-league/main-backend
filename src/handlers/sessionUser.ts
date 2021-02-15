import { createHandler } from '@src/utils'
import { User } from '@src/types'

export const sessionUser = createHandler<null, User>(async (req, res) =>
{
    res.send(req.user.value)
})
