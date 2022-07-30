import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const err = exception.getResponse() as
            | { message: any, statusCode: number } // 이 부부은 내가 직접 발생시킨 에러=users.service.ts의 throw new UnauthorizedException('이미 존재하는 사용자입니다.')
            | { error: string; statusCode: 400; message: string[] }; // class-validator 타이핑

        if (typeof err !== 'string' && err.statusCode === 400) {
            return response.status(status).json({
                success: false,
                code: status,
                data: err.message,
            });
        }

        response.status(status).json({
            success: false,
            code: status,
            data: err.message,
        });
    }
}