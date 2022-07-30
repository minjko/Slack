import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {WorkspacesService} from "./workspaces.service";
import {User} from "../common/decorators/user.decorator";
import {Users} from "../entities/Users";
import {CreateWorkspaceDto} from "./dto/create-workspace.dto";

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(
      private workspacesService: WorkspacesService
  ) {
  }
  @Get()
  getMyWorkspaces(@User() user: Users) { // 직접 만든 데코레이터 사용 // entity
  // ['1', '2', '3']
    return this.workspacesService.findMyWorkspaces(user.id); // myId
  }

  @Post()
  createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(
        body.workspace,
        body.url,
        user.id,
    );
  }

  @Get(':url/members')
  getAllMembersFromWorkspace(@Param('url') url: string) {
    return this.workspacesService.getWorkspaceMembers(url);
  }

  @Post(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getAllMemberInfoInWorkspace() {}
}
