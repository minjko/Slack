import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LoggerMiddleware} from "./middlewares/logger.middleware";

const tempMethod = () => {
  return {
    SECRET: 'ConfigModule 사용',
    PORT : 3030
  }
}

/*
const tempMethod = async () => {
  const response = await axios.get('/비밀키요청')
  return response.data;
}
*/

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load:[tempMethod]})],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
