import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JWTTokenInput } from 'src/modules/auth/dto';
import { UserEntity } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { verifyToken } from 'src/utils/jwt';

export interface CustomRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }

    const token = req.headers['authorization'].split(' ')[1];

    try {
      const decode = verifyToken(token) as JWTTokenInput;

      if (!decode?.email) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.userService.findUserByEmail(decode?.email);

      if (!user) {
        throw new HttpException(
          'Login user not found. Please Login again.',
          HttpStatus.NOT_FOUND,
        );
      }

      req.user = user;
      next();
    } catch (error) {
      throw error;
    }
  }
}
