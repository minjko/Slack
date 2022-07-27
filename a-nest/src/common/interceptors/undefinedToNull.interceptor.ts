import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 컨트롤러 실행 전 부분

    // 컨트롤러 실행 후 부분 -->
    // return next.handle().pipe(map((data) => ({ data, code: 'SUCCESS' })));
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
    // data가 undefined라면 null로 바꿔주는 작업 : ex. undefined를 인식할 수 없는 json에서 null로 바뀌므로 인식할 수 있다.
  }
}

//CREATE SCHEMA `sleact` DEFAULT CHARACTER SET utf8mb4 ;