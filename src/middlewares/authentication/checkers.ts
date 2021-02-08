import { createHandler } from '@utils/createHandler'
import { throwApiError } from '@utils/throwApiError'

export const isAuthorized = createHandler(async (req, res, next) =>
{
    if (req.isAuthenticated()) next()
    else throwApiError({ message: 'Вы не авторизированны', code: 403 })
})

export const isAdmin = createHandler(async (req, res, next) =>
{
    if (req.user.value.role === 'Админ') next()
    else throwApiError({ message: 'Вы не имеете прав администратора', code: 403 })
})
