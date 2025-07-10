import { FastifyReply, FastifyRequest } from "fastify";
import { UsersRepository } from "../../repositories/users/UsersRepositoriesImpl";
import { ListUsersUsecase } from "../../usecases/users/ListUsersUsecase";

const repo = new UsersRepository()
export class ListUsersController{
    async handle(req:FastifyRequest, reply:FastifyReply){
        const usecase = new ListUsersUsecase(repo)
        const result = await usecase.execute()
        return reply.status(200).send(result)

    }
}