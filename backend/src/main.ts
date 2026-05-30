import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/auth/services/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const usersService = app.get(UsersService);
  await usersService.createAdminIfNotExists();

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Error al iniciar la aplicación Nest:', err);
  process.exit(1);
});
