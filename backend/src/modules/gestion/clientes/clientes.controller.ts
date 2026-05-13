import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {

  constructor(private readonly clientesService: ClientesService) {}

  //GET
  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  //POST
  @Post()
  create(@Body() body: any) {
    return this.clientesService.create(body);
  }

  //PUT
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.clientesService.update(Number(id), body);
  }
}