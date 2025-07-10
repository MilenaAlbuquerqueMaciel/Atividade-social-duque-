import { FastifyReply, FastifyRequest } from "fastify";
import { UsersRepository } from "../../repositories/users/UsersRepositoriesImpl";
import { CreateUserUseCase } from "../../usecases/users/CreateUserUseCase";

const userRepository = new UsersRepository()
export class CreateUserController{
    async handle(req:FastifyRequest, reply:FastifyReply){
        try{
            const usecase = new CreateUserUseCase(userRepository)
            const result = await usecase.execute(req.body as any)
            return reply.status(200).send(result)
        }catch(error: any){
            return reply.status(400).send({error: error.message})   
        }
    }
}