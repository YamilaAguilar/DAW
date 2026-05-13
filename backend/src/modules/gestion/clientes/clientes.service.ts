import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente, EstadoCliente } from './cliente.entity';
import { Proyecto } from '../../../proyectos/proyecto.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {}

  // LISTAR CLIENTES
  findAll() {
    return this.clienteRepository.find();
  }

  // CREAR CLIENTE
  create(data: Partial<Cliente>) {
    const cliente = this.clienteRepository.create(data);

    return this.clienteRepository.save(cliente);
  }

  // ACTUALIZAR CLIENTE
  async update(id: number, data: Partial<Cliente>) {
    const cliente = await this.clienteRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    // VALIDAR BAJA
    if (data.estado === EstadoCliente.BAJA) {
      const proyectosAsociados = await this.proyectoRepository.count({
        where: {
          clienteId: id,
        },
      });

      if (proyectosAsociados > 0) {
        throw new BadRequestException(
          'No se puede dar de baja un cliente con proyectos asociados',
        );
      }
    }

    await this.clienteRepository.update(id, data);

    return this.clienteRepository.findOneBy({ id });
  }
}