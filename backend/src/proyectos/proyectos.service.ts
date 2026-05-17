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

    if (estado) where.estado = estado;

    if (clienteId) {
      where.cliente = { id: Number(clienteId) };
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
      ...data,
      cliente: data.clienteId ? { id: data.clienteId } : null,
    });

    return this.proyectosRepository.save(proyecto);
  }

  async update(id: number, data: any) {
    await this.proyectosRepository.update(id, {
      ...data,
      cliente: data.clienteId ? { id: data.clienteId } : undefined,
    });

    return this.findOne(id);
  }
}