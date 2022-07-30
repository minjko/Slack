// auth.service.ts, local.serializer.ts, local.strategy.ts를 하나로 묶어준다
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../entities/Users';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        // UsersModule, // UsersModule 대신 아래 Users 레포지토리로 대체했었음.
        TypeOrmModule.forFeature([Users]),
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
