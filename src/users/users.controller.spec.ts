import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let dummyUserService: Partial<UsersService>;
  let dummyAuthService: Partial<AuthService>;

  beforeEach(async () => {
    dummyUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as UserEntity);
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: 'asdf' } as UserEntity,
        ]);
      },
      // remove: () => {},
      // update: () => {},
    };
    dummyAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as UserEntity);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: dummyUserService,
        },
        {
          provide: AuthService,
          useValue: dummyAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns list of useres with given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser throws an error if user with given id is not found', async () => {
    dummyUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('findUser returns a single user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: 2 };
    const user = await controller.signin(
      {
        email: 'asdf@adsf.com',
        password: 'asdf',
      },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
