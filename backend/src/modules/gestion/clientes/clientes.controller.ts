import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ClientesService } from './clientes.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)

@Controller('clientes')
export class ClientesController {

  constructor(private readonly clientesService: ClientesService) {}

  // GET
  @Get()
  findAll(
    @Query('nombre') nombre?: string,
    @Query('estado') estado?: string,
  ) {
    return this.clientesService.findAll(nombre, estado);
  }

  // POST
  @Post()
  create(@Body() body: any) {
    return this.clientesService.create(body);
  }

  // PUT
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.clientesService.update(Number(id), body);
  }
}