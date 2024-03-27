import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { UserEntity } from '../users.entity';

declare module 'express' {
  interface Request {
    currentUser?: UserEntity;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.currentUser = user;

      next();
    }
  }
}
