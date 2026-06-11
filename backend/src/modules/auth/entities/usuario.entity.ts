import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoUsuario } from '../enums/estado-usuario.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombreUsuario!: string;

  @Column()
  claveHash!: string;

  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    default: EstadoUsuario.ACTIVO,
  })
  estado!: EstadoUsuario;
}
