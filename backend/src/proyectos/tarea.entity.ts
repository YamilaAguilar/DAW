import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Proyecto } from './proyecto.entity';
import { EstadosTareasEnum } from './enums/estados-tareas.enum';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column({ type: 'enum', enum: EstadosTareasEnum })
  estado!: EstadosTareasEnum;

  @Column({ name: 'proyectoId' })
  proyectoId!: number;

  @ManyToOne(() => Proyecto, (proyecto) => undefined, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proyectoId' })
  proyecto!: Proyecto;
}
