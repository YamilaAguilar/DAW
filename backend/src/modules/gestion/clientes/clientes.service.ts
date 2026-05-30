import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

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
  async findAll(nombre?: string, estado?: string) {
  const where: any = {};

 if (nombre) {
  where.nombre = ILike(`%${nombre}%`);
 }

  if (estado) {
    where.estado = estado;
  }

  return this.clienteRepository.find({
    where,
  });
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
          cliente: {
            id,
          },
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