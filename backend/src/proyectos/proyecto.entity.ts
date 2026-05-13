import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  clienteId!: number;
}