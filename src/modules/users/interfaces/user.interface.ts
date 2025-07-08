import { KnexUserRepository } from "../infrastructure/KnexUserRepository"

export interface UserInterface {
    id: string,
    name: string,
    last_name: string,
    email: string
    password: string
    phone: string
    general_role_id: string
    created_at: Date
    updated_at?: Date
    deleted_at?: Date
    a?:string
}


