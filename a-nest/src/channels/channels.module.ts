import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChannelMembers} from "../entities/ChannelMembers";
import {ChannelChats} from "../entities/ChannelChats";
import {Channels} from "../entities/Channels";
import {Workspaces} from "../entities/Workspaces";
import {Users} from "../entities/Users";
import {EventsGateway} from "../events/events.gateway";
import {EventsModule} from "../events/events.module";

@Module({
  imports: [TypeOrmModule.forFeature([Channels,
    ChannelMembers,
    ChannelChats,
    Users,
    Workspaces,
  ]),
    EventsModule,
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class ChannelsModule {}
