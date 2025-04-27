/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO, NewUserInput } from './dto/auth.dto';
import { IUser } from './guards/auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ email: string; _id: string; username: string } | null> {
    const user = await this.userService.findOne(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDTO) {
    const userFound: IUser | null = await this.validateUser(
      user.email,
      user.password,
    );

    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: userFound._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: userFound['_doc'] as IUser,
    };
  }

  async register(data: NewUserInput) {
    const user = await this.userService.create(data);
    const { password: _, ...result } = user;
    return result;
  }
}
