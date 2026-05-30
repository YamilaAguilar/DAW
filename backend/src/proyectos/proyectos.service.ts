import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Proyecto } from './proyecto.entity';
import { Cliente } from '../modules/gestion/clientes/cliente.entity';

@Injectable()
export class ProyectosService {

  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
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

      cliente: data.clienteId
        ? ({ id: Number(data.clienteId) } as any)
        : null,

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

}