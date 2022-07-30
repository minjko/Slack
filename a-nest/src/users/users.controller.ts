import { Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { User } from '../common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from "../auth/local-auth.guard";
import {LoggedInGuard} from "../auth/logged-in.guard";
import {NotLoggedInGuard} from "../auth/not-logged-in.guard";

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard)
  @ApiOperation({ summary: '회원가입' })
  @Post() // 닉네임, 이메일, 비밀번호를 Body로 받는다.
  async join(@Body() body: JoinRequestDto) {
    // Data transfer object
    await this.usersService.join(body.email, body.nickname, body.password);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(new LocalAuthGuard)
  @Post('login')
  login(@User() user) {
    return user;
  }

  @UseGuards(new LoggedInGuard)
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout(@Req() req, @Res() res) {
    // @Res = @Response
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
