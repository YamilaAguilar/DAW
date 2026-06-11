import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { CreateTareaDto } from './dtos/input/create-tarea.dto';
import { UpdateTareaDto } from './dtos/input/update-tarea.dto';
import { ListTareaDto } from './dtos/output/list-tarea.dto';
import { EstadosTareasEnum } from './enums/estados-tareas.enum';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareasRepository: Repository<Tarea>,
  ) {}

  async listarPorProyecto(proyectoId: number): Promise<ListTareaDto[]> {
    const tareas = await this.tareasRepository.find({ where: { proyectoId } });
    return tareas.map((t) => ({
      id: t.id,
      descripcion: t.descripcion,
      estado: t.estado,
    }));
  }

  async crearTarea(dto: CreateTareaDto, proyectoId: number): Promise<{ id: number }> {
    const tarea = this.tareasRepository.create({
      descripcion: dto.descripcion,
      estado: EstadosTareasEnum.PENDIENTE,
      proyectoId,
    });

    await this.tareasRepository.save(tarea);
    return { id: tarea.id };
  }

  async actualizarTarea(idTarea: number, dto: UpdateTareaDto): Promise<void> {
    const tarea = await this.tareasRepository.findOne({ where: { id: idTarea } });
    if (!tarea) {
      throw new BadRequestException('La tarea indicada no existe');
    }

    this.tareasRepository.merge(tarea, dto);
    await this.tareasRepository.save(tarea);
  }

  // async eliminarTarea(idTarea: number): Promise<void> {
 //   const tarea = await this.tareasRepository.findOne({ where: { id: idTarea } });
 //   if (!tarea) throw new BadRequestException('La tarea indicada no existe');
 //   await this.tareasRepository.remove(tarea);
 // }

  async eliminarTarea(idTarea: number): Promise<void> {
    const tarea = await this.tareasRepository.findOne({ where: { id: idTarea } });
    if (!tarea) {
     throw new BadRequestException('La tarea indicada no existe');
    }
   tarea.estado = EstadosTareasEnum.BAJA;
   await this.tareasRepository.save(tarea);
  }
}
