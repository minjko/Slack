import {BadRequestException, HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from '../entities/Users';
import { bcrypt } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(Users)
      private userRepository: Repository<Users>,
  ) {}
  getUser() {}

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
    const user = await this.userRepository.findOne({ where: { email }});
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
