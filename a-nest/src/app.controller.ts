import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller() // @Controller('abc')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // @Get('user') GET /abc/user
  getUser(){
    return this.appService.getUser();  // 이 line의 getUser()의 정의는 app.service.
  }

  @Post() // @Post('user') POST/abc/user
  postUser(): string {
    return this.appService.postUser();
  }
}


/* express의 경우 test하려면 mocking해야 함.
const req = jest.mock(() => ({}));
const res = jest.mock(() => ({}));
const next = jest.fn();

function findUser(email) {
  return User.findOne({ email });
}

async (req, res, next) => {
  const user = await findUser(req.body.email);
  res.json(user);
}
 */

/* express의 단점 : 응답이 중복되는 경우가 많음

@Controller('abc')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user') // GET /abc/user
  getUser(): string {
    return { code:SUCCES, data:user }
  }

  @Post('user') // POST/abc/user
  postUser(): string {
    return { code:SUCCESS, data:'hello'}
  }

  @Post('user') // POST/abc/user
  postUser(): string {
    return { code:SUCCESS, data:false}
  }
}

# 함수를 만들어서
function generateResponse(data) {
  return { code:SUCCESS, data }
}
그리고 나서 return 문에 generateResponse('hello'), generateResponse(false) 등을 넣어주거나

# interceptor 미들웨어가
return 'user';, return false; 만 해도
{ code:SUCCESS, data:'user' }, { code:'SUCCESS', data:false }로 만들어준다.


 */