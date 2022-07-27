import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator( // 익명함수
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // Http 서버
    return request.user;
  },
);
