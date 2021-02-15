import { Option } from 'fp-ts/lib/Option'
import { IVerifyOptions } from 'passport-local'
import { User } from '@src/types/user'

export type DoneFn = (error: unknown, user?: Option<User>, options?: IVerifyOptions & { status: 'failed'|'done'; }) => void
