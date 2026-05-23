import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Proyecto } from './proyecto.entity';
import { ProyectosController } from './proyectos.controller';
import { ProyectosService } from './proyectos.service';
import { Cliente } from '../modules/gestion/clientes/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Cliente])],
  controllers: [ProyectosController],
  providers: [ProyectosService],
})
export class ProyectosModule {}