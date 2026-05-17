import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';

import { ProyectosService } from './proyectos.service';

@Controller('proyectos')
export class ProyectosController {
  constructor(
    private readonly proyectosService: ProyectosService,
  ) {}

  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.proyectosService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.proyectosService.update(Number(id), body);
  }
}