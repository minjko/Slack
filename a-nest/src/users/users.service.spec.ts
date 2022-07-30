import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Users} from "../entities/Users";
import {WorkspaceMembers} from "../entities/WorkspaceMembers";
import {ChannelMembers} from "../entities/ChannelMembers";
import {Connection} from "typeorm";

class MockUserRepository {
  #data = [
    { id: 2, email: 'transaction@gmail.com'}
  ]
  findOne({ where: { email } }) {
    if (email === 'transaction@gmail.com') {
      return { id: 2, email: 'transaction@gmail.com' };
    }
    return null;
  }
}
class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository,
        },
        { provide: Connection,
          useClass: class MockConnection {}
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByEmail은 이메일을 통해 user를 찾아야 함', () => {
    expect(service.findByEmail('transaction@gmail.com')).resolves.toStrictEqual({
      email: 'transaction@gmail.com',
      id: 2,
    });
  });

  it('findByEmail은 user를 못 찾으면 null을 반환해야 함', () => {
    expect(service.findByEmail('misstyping@gmail.com')).resolves.toStrictEqual(null);
  });


});
