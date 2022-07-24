import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('api/workspaces/:workspace/dms')
export class DmsController {
  @ApiParam({
    name: 'url',
    required: true,
    description: '워크스페이스 url',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 아이디',
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '한번에 가져오는 개수',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '불러올 페이지',
  })
  @Get(':id/chats')
  getChat(@Query() query, @Param() param) {
    // @Param('id') param
    console.log(query.perPage, query.page);
    console.log(param.id, param.url); // id
  } // 아래와 똑같다.
  /*
  getChat(@Query('perPage') perPage, @Query('page') page) {
    console.log(perPage, page);
  }
  */
  @Post(':id/chats')
  postChat(@Body() body) {}
}
