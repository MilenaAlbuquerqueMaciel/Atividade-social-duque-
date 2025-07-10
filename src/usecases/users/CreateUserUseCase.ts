import { IUsersRepository } from '../../repositories/users/IUsersRepository'
import { CreateUserInput ,createUserSchema} from '../../schemas/user-schema';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../entities/User'
import { date } from 'zod';



export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const data = createUserSchema.parse(input)
    const existingPhone = await this.usersRepository.findByPhone(input.phone);
      if (existingPhone) {
          throw new Error('Telefone já cadastrado')
      }
      const hashedPassword = await hash(data.password, 10)
      const user: User = {
          id: uuidv4(),
          name: data.name,
          email: data.email,
          password: hashedPassword,
          phone: data.phone,
          created_at: new Date(),
          posts: [],
          comments: []
        }

    await this.usersRepository.create(user)
    
    return user
  }
}