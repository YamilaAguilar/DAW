import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { ProyectosService } from './proyectos.service';

@Controller('proyectos')

export class ProyectosController {

  constructor(
    private readonly proyectosService: ProyectosService
  ) {}

  // GET /proyectos
  @Get()
  findAll(
    @Query('estado') estado?: string,
    @Query('clienteId') clienteId?: string,
  ) {

    return this.proyectosService.findAll(
      estado,
      clienteId
    );

  }

  // GET /proyectos/:id
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ) {

    return this.proyectosService.findOne(id);

  }

  // POST /proyectos
  @Post()
  create(@Body() body: any) {

    return this.proyectosService.create(body);

  }

  // PUT /proyectos/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {

    return this.proyectosService.update(
      id,
      body
    );

  }

}