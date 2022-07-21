import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any; // (5)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);

  //(5)
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
