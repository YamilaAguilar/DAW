import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Proyecto } from './proyecto.entity';
import { ProyectosController } from './proyectos.controller';
import { ProyectosService } from './proyectos.service';
import { Cliente } from '../modules/gestion/clientes/cliente.entity';
import { Tarea } from './tarea.entity';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Cliente, Tarea])],
  controllers: [ProyectosController, TareasController],
  providers: [ProyectosService, TareasService],
})
export class ProyectosModule {}
