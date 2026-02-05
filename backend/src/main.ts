import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置Swagger
  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('NestJS API 文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 配置CORS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();