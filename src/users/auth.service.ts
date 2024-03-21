import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.UsersService.find(email);

    if (users.length) {
      throw new BadRequestException(
        'The email you provided may already be in use',
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

  }

  authenticate() {}
}
