import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // mock service
    const dummyUserService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as UserEntity),
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
});
