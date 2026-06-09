import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Proyecto, EstadoProyecto } from './proyecto.entity';
import { Cliente } from '../modules/gestion/clientes/cliente.entity';
import { Tarea } from './tarea.entity';
import { EstadosTareasEnum } from './enums/estados-tareas.enum';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,

    @InjectRepository(Tarea)
    private readonly tareasRepository: Repository<Tarea>,
  ) {}

  findAll(estado?: string, clienteId?: string) {
    const where: any = {};

    if (estado) {
      where.estado = estado;
    }

    if (clienteId) {
      where.cliente = {
        id: Number(clienteId),
      };
    }

    return this.proyectosRepository.find({
      where,
      relations: ['cliente'],
    });
  }

  async findOne(id: number) {
    return this.proyectosRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
  }

  async create(data: any) {
    if (data.clienteId) {
      const cliente = await this.clientesRepository.findOne({
        where: { id: Number(data.clienteId) },
      });

      if (!cliente || cliente.estado !== 'Activo') {
        throw new Error('El cliente debe estar Activo');
      }
    }

    const proyecto = this.proyectosRepository.create({
      nombre: data.nombre,

      estado: data.estado,

      cliente: data.clienteId ? ({ id: Number(data.clienteId) } as any) : null,
    });

    return this.proyectosRepository.save(proyecto);
  }

  async update(id: number, data: any) {
    if (data.clienteId) {
      const cliente = await this.clientesRepository.findOne({
        where: { id: Number(data.clienteId) },
      });

      if (!cliente || cliente.estado !== 'Activo') {
        throw new Error('El cliente debe estar Activo');
      }
    }

    const proyecto = await this.findOne(id);

    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    proyecto.nombre = data.nombre;
    proyecto.estado = data.estado;

    proyecto.cliente = data.clienteId
      ? ({ id: Number(data.clienteId) } as any)
      : null;

    return this.proyectosRepository.save(proyecto);
  }
    async findTareasByProyecto(proyectoId: number) {
    return this.tareasRepository.find({
      where: { proyecto: { id: proyectoId } },
    });
  }
  async getResumenEstadisticas() {
    // Cantidad de proyectos en estado ACTIVO
    const proyectosActivos = await this.proyectosRepository.count({
      where: { estado: EstadoProyecto.ACTIVO },
    });

    // Cantidad total de tareas pendientes
    const tareasPendientes = await this.tareasRepository.count({
      where: { estado: EstadosTareasEnum.PENDIENTE },
    });

    // Cantidad de proyectos por cliente (incluye “Proyecto interno”)
    const proyectos = await this.proyectosRepository.find({
      relations: ['cliente'],
    });

    const mapa = new Map<string, number>();

    for (const p of proyectos) {
      const clave = p.cliente ? p.cliente.nombre : 'Proyecto interno';
      mapa.set(clave, (mapa.get(clave) ?? 0) + 1);
    }

    const proyectosPorCliente = Array.from(mapa.entries()).map(
      ([cliente, cantidad]) => ({ cliente, cantidad }),
    );

    return {
      proyectosActivos,
      tareasPendientes,
      proyectosPorCliente,
    };
  }
}
