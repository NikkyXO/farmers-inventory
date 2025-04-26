import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, NewUserInput } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async register(@Body() body: NewUserInput) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
