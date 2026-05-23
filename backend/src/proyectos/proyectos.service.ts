import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Proyecto } from './proyecto.entity';

@Injectable()
export class ProyectosService {

  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
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

    const proyecto = this.proyectosRepository.create({

      nombre: data.nombre,

      estado: data.estado,

      cliente: data.clienteId
        ? ({ id: Number(data.clienteId) } as any)
        : null,

    });

    return this.proyectosRepository.save(proyecto);

  }

  async update(id: number, data: any) {

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

}