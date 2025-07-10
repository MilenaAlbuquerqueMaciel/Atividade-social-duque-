import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { User } from "../../entities/User";

export class ListUsersUsecase{
    constructor(private usersRepository:IUsersRepository){}
    async execute(): Promise<Omit<User, 'password'>[]> {
        const users = await this.usersRepository.findAll()
        return users.map(({ password, ...user }) => user)
    }
}