import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { EstadoUsuario } from '../enums/estado-usuario.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {}

  findByNombreUsuario(nombreUsuario: string) {
    return this.usuariosRepo.findOne({ where: { nombreUsuario } });
  }

  async createAdminIfNotExists() {
    const nombreUsuario = 'admin';
    const existing = await this.findByNombreUsuario(nombreUsuario);
    if (existing) return;

    const clave = 'admin123';
    const claveHash = await bcrypt.hash(clave, 10);

    const admin = this.usuariosRepo.create({
      nombreUsuario,
      claveHash,
      estado: EstadoUsuario.ACTIVO,
    });

    await this.usuariosRepo.save(admin);
    console.log('Usuario admin creado: admin / admin123');
  }
}
