import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  //bcrypt.hash(userDto.password, 5).then((data) => console.log(22, data, 22));

  async login(userDto: LoginUserDto) {
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      '$2a$05$NdugZkmn1ZM0yBT0lrN1A.eL4ZqRUy.CPWGlI8zQu9PYu9iB4C7Fq',
    );
    if (passwordEquals) {
      return {
        token: this.jwtService.sign({ login: 'login' }),
      };
    }

    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }
}
