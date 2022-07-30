import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string, done: CallableFunction) {
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException();  // new HttpException('...', 401);
      }
      return done(null, user); // strategy(local.strategy)에서 done 되면, auth guard(local-auth.guard)의 await super.login(request)로 가고, 여기에서 serializer(local.serializer)의 user(serializeUser 함수)로 간다.
    }
}