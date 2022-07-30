import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./http-Exception.filter";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(
      new ValidationPipe( {
          transform: true,
      }),
  );
  if (process.env.NODE_ENV === 'production') {
      app.enableCors({
          origin: ['https://sleact.nodebird.com'],
          credentials: true,
      });
  } else {
      app.enableCors({
          origin:true,
          credentials: true,
      });
  }
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
     prefix: '/uploads',
  });

  app.useGlobalFilters(new HttpExceptionFilter);

  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
  console.log(`listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
