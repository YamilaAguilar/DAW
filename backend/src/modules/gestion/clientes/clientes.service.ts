import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientesService {

  // Crear Cliente (POST)
  create(cliente: any) {
    return {
      message: 'Cliente creado',
      data: cliente
    };
  }

  findAll() {
    return [
      { id: 1, nombre: 'Cliente 1', estado: 'ACTIVO' },
      { id: 2, nombre: 'Cliente 2', estado: 'BAJA' }
    ];
  }

}