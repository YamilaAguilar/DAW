import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/auth/services/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost', 'https://localhost']
  });

  app.setGlobalPrefix('api');

  const usersService = app.get(UsersService);
  await usersService.createAdminIfNotExists();

  const port = process.env.PORT || 4000;

  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('Error al iniciar la aplicación Nest:', err);
  process.exit(1);
});