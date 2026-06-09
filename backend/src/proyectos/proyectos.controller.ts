import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseIntPipe,
  Query,
  //UseGuards,
} from '@nestjs/common';

import { ProyectosService } from './proyectos.service';
//import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get()
  findAll(
    @Query('estado') estado?: string,
    @Query('clienteId') clienteId?: string,
  ) {
    return this.proyectosService.findAll(estado, clienteId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.proyectosService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.proyectosService.update(id, body);
  }
  @Get(':id/tareas')
  findTareasByProyecto(@Param('id', ParseIntPipe) id: number) {
  return this.proyectosService.findTareasByProyecto(id);
  }
  @Get('estadisticas/resumen')
  getResumenEstadisticas() {
    return this.proyectosService.getResumenEstadisticas();
  }
}