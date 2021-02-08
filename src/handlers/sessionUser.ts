import { createHandler } from '@src/utils'
import { User } from '@src/types'

export const sessionUser = createHandler<null, null, User>(async (req, res) =>
{
    res.send(req.user.value)
})
