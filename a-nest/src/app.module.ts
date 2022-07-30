import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DMsModule } from './dms/dms.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import {ChannelChats} from "./entities/ChannelChats";
import {ChannelMembers} from "./entities/ChannelMembers";
import {Channels} from "./entities/Channels";
import {DMs} from "./entities/DMs";
import {Mentions} from "./entities/Mentions";
import {Users} from "./entities/Users";
import {WorkspaceMembers} from "./entities/WorkspaceMembers";
import {Workspaces} from "./entities/Workspaces";
import {AuthModule} from "./auth/auth.module";
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

const tempMethod = () => {
  return {
    SECRET: 'ConfigModule 사용',
    PORT: 3030,
  };
};

/*
const tempMethod = async () => {
  const response = await axios.get('/비밀키요청')
  return response.data;
}
*/

const getData = async () => {
  // 어떤 실행이 있든 값을 가져와서 아래와 같이 return
  return {
    DB_USERNAME: 'root',
    DB_PASSWORD: 'Mydatabase1(',
    DB_DATABASE: 'slack',
  }
}
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getData] }),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DMsModule,
    TypeOrmModule.forFeature([Users, WorkspaceMembers, Workspaces, ChannelMembers, Channels, ChannelChats]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ // './entities/*.ts'
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
      ],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      migrations: [__dirname + '/migrations/*.ts'],
      charset: 'utf8mb4',
      synchronize: false,
      logging: true,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
