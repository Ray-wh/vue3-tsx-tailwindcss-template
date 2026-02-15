/**
 * 应用根模块
 * 负责配置和集成所有子模块
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    // 配置模块，加载环境变量和自定义配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      load: [databaseConfig],
    }),
    // 数据库模块，异步配置
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database')!, // 使用配置服务获取数据库配置
      inject: [ConfigService], // 注入配置服务
    }),
    // 用户模块
    UsersModule,
  ],
  controllers: [AppController], // 应用控制器
  providers: [AppService], // 应用服务
})
export class AppModule {}
