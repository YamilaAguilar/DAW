import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EstadoCliente {
  ACTIVO = 'Activo',
  BAJA = 'Baja',
}

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column({
    type: 'enum',
    enum: EstadoCliente,
    default: EstadoCliente.ACTIVO,
  })
  estado!: EstadoCliente;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  telefono?: string;
}