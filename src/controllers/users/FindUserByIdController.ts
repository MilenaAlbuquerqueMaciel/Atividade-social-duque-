import { FastifyReply, FastifyRequest } from "fastify";
import { UsersRepository } from "../../repositories/users/UsersRepositoriesImpl";
import { FindUserByIdUserCase } from "../../usecases/users/FindByIdUseCase";

export class FindUserByIdController{
    async handle(req:FastifyRequest<{Params:{id:string}}>,
         reply:FastifyReply){
    try{
        const usecase = new FindUserByIdUserCase(new UsersRepository())
        const result = await usecase.execute(req.params.id)
        return reply.send(result)
    }catch(error:any){
        return reply.status(404).send({ error: error.message })
    }
}
}