"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./modules/auth/services/users.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    await usersService.createAdminIfNotExists();
    await app.listen(3000);
}
bootstrap().catch((err) => {
    console.error('Error al iniciar la aplicación Nest:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map