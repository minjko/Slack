import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  async getUser() {
    //return process.env.SECRET;
    return this.configService.get('SECRET');
  }

  /*/ 실제 사용 비즈니스로직 예시
  async getUser(): string {
    const user = await User.findOne();
    return user;
  }
  */

  postUser(): string {
    return 'post succeeded';
  }
  /*/ 실제 사용 비즈니스 로직 예시
  async postUser(): string {
    const user = await User.create();
    return user;
  }
  */
}
