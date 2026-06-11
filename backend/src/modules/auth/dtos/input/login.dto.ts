import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  nombreUsuario!: string;

  @IsString()
  clave!: string;
}
