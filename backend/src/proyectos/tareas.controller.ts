import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  //UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dtos/input/create-tarea.dto';
import { UpdateTareaDto } from './dtos/input/update-tarea.dto';
//import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
@Controller('proyectos/:proyectoId/tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  listar(@Param('proyectoId', ParseIntPipe) proyectoId: number) {
    return this.tareasService.listarPorProyecto(proyectoId);
  }

  @Post()
  crear(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Body() dto: CreateTareaDto,
  ) {
    return this.tareasService.crearTarea(dto, proyectoId);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTareaDto,
  ) {
    return this.tareasService.actualizarTarea(id, dto);
  }

 // @Delete(':id')
 // eliminar(@Param('id', ParseIntPipe) id: number) {
 //   return this.tareasService.eliminarTarea(id);
 // }

 @Put(':id/baja')
  eliminar(@Param('id', ParseIntPipe) id: number) {
  return this.tareasService.eliminarTarea(id);
 }
}
