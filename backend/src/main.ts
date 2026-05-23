import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/auth/services/users.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
  });

  const usersService = app.get(UsersService);
  await usersService.createAdminIfNotExists();

  await app.listen(3000);
}
bootstrap();