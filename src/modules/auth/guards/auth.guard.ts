/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export type IUser = {
  email: string;
  _id: string;
  username: string;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Unable to authenticate, please login in again',
        )
      );
    }
    return user;
  }
}

// export const IsPublic = () => SetMetadata('isPublic', true);
