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

  findAll() {
    return this.proyectosRepository.find({
      relations: ['cliente'],
    });
  }

  create(data: Partial<Proyecto>) {
    const proyecto = this.proyectosRepository.create(data);
    return this.proyectosRepository.save(proyecto);
  }

  async update(id: number, data: Partial<Proyecto>) {
    await this.proyectosRepository.update(id, data);

    return this.proyectosRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
  }
}