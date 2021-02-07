import { createHandler } from '@src/utils'
import { User } from '@src/types'

export const sessionUser = createHandler<null, null, User>(((req, res) =>
{
    res.send(req.user.value)
}))
