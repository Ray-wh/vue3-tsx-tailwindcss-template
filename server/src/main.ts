import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 设置全局API前缀
  app.setGlobalPrefix('api');

  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => (console.error('启动失败:', err), process.exit(1)));
