import {BadRequestException, HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository} from "typeorm";
import { Users } from '../entities/Users';
import * as bcrypt from 'bcrypt'
import { WorkspaceMembers } from "../entities/WorkspaceMembers";
import { ChannelMembers } from "../entities/ChannelMembers";
@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
      @InjectRepository(WorkspaceMembers)
      private workspaceMembersRepository: Repository<WorkspaceMembers>,
      @InjectRepository(ChannelMembers)
      private channelMembersRepository: Repository<ChannelMembers>,
      private connection: Connection,
  ) {}
  getUser() {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async join(email: string, nickname: string, password: string) {
    /*
    if (!email) {
      // 이메일 없다고 에러
      // throw new HttpException('이메일이 없네요', 400);
      throw new BadRequestException('이메일이 없네요');
    }
    if (!nickname) {
      // 닉네임 없다고 에러
      throw new BadRequestException('닉네임이 없네요');
    }
    if (!password) {
      // 비밀번호 없다고 에러
      throw new BadRequestException('비밀번호가 없네요');
    }
    */

    // 아래 두줄 대신
    // const queryRunner = getConnection().createQueryRunner();
    // queryRunner.connect();
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
        .getRepository(Users)
        .findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      // await qureyRunner.manager.getRepository(Users).save({})
      const returned = await queryRunner.manager.getRepository(Users).save( {
        email,
        nickname,
        password: hashedPassword,
      });
      /* 주석처리 하면 안 되는 것 같은데, 이게 있으면 회원가입이 안 된다.
      throw new Error('롤백되나');
      */
      const workspaceMember = await queryRunner.manager.getRepository(WorkspaceMembers).create();
      workspaceMember.UserId = returned.id;
      workspaceMember.WorkspaceId = 1;
      await queryRunner.manager.getRepository(WorkspaceMembers).save(workspaceMember);
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: returned.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction(); // startTransaction으로 돌아감
      throw error;
    } finally {
      await queryRunner.release(); // 수동 시 반드시 DB와 연결 끊어줘야 함
    }
  }
}