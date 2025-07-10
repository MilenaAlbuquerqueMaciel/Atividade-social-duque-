import Fastify from "fastify";
import { AppDataSource } from "./data-source";
import { usersRoutes } from './routes/users.routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function starApp() {
  const app = Fastify();

  // Registrar Swagger primeiro
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Social Duque API',
        description: 'Documentação da API do projeto Social Duque',
        version: '1.0.0',
      },
      host: 'localhost:3333',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  });

  // Registra rotas
  app.register(usersRoutes);

  // Inicializar banco de dados
  await AppDataSource.initialize()
    .then(() => {
      console.log('Banco de 🎲 inicializado');
    })
    .catch((ex) => {
      console.log('❌ Erro de conexão do banco de dados', ex);
      process.exit(1);
    });

  // Só agora começa o servidor
  app.listen({ port: 3333 }).then(() => {
    console.log('🚀 Server is running at http://localhost:3333');
    console.log('📄 Documentação Swagger disponível em http://localhost:3333/docs');
  });

  return app;
}
