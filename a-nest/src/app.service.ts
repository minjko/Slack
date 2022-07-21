import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //* 원래 기본 비즈니스 로직
  getUser(): string {
    return 'Hello World!';
  }
  //*/
  /*/ 실제 사용 비즈니스 로직 예시
  async getUser(): string {
    const user = await User.findOne();
    return user;
  }
  */

  //* 원래 기본 비즈니스 로직
  postUser(): string {
    return 'post succeeded';
  }
  //*/
  /*/ 실제 사용 비즈니스 로직 예시
  async postUser(): string {
    const user = await User.create();
    return user;
  }
  */

}


