import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let dummyUserService: Partial<UsersService>;

  beforeEach(async () => {
    // mock service
    const users: UserEntity[] = [];
    dummyUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999999999),
          email,
          password,
        } as UserEntity;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: dummyUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    async () => {
      await service.signup('qwerty@qwerty.com', 'qwerty');
      await expect(
        service.signup('qwerty@qwerty.com', 'qwerty'),
      ).rejects.toThrow(BadRequestException);
    };
  });

  it('throws an error if signin is called with an unused email', async () => {
    await expect(
      service.signin('notindb@notindb.com', 'password'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws an error if an invalid password is provided', async () => {
    await expect(
      service.signin('qwerty@qwerty.com', 'notpassword'),
    ).rejects.toThrow(NotFoundException);
  });

  it('returns a user if correct password id provided', async () => {
    await service.signup('scoobydoo@mysterymachine.com', 'ruhroh');

    const user = await service.signin('scoobydoo@mysterymachine.com', 'ruhroh');

    expect(user).toBeDefined();
  });
});
