import { createHandler } from '@src/utils/createHandler'
import { throwApiError } from '@src/utils/throwApiError'

export const isAuthorized = createHandler(((req, res, next) =>
{
    if (req.isAuthenticated()) next()
    else throwApiError({ message: 'Вы не авторизированны', code: 403 })
}))

export const isAdmin = createHandler(((req, res, next) =>
{
    if (req.user.value.role === 'Админ') next()
    else throwApiError({ message: 'Вы не имеете прав администратора', code: 403 })
}))
