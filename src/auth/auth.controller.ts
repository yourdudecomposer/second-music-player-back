import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('admin')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }
}
