import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from './config/env'
import { User } from './entities/User'
import { Post } from './entities/Post'
import { Comment } from './entities/Comment'


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database:env.DATABASE_FILE,
    synchronize: false,
    logging: true,
    entities: [User, Post, Comment],
    migrations: ['src/typeorm/migrations/*.ts']
})