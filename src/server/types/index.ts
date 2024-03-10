import type { UsersTable } from '../db/queries/users'

declare global{
    namespace Express {
        export interface Request {
            currentUser?: UsersTable
        }
    }
}