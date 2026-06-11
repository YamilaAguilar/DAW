import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//import { LoginDto } from '../dtos/input/login.dto';
import { LoginDto } from '../dtos/input/login.dto';
import { UsersService } from './users.service';
import { EstadoUsuario } from '../enums/estado-usuario.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByNombreUsuario(dto.nombreUsuario);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const match = await bcrypt.compare(dto.clave, user.claveHash);
    if (!match) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (user.estado !== EstadoUsuario.ACTIVO) {
      throw new ForbiddenException('Usuario inactivo');
    }

    const payload = { sub: user.id, nombreUsuario: user.nombreUsuario };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
