/**
 * 用户模块
 * 封装用户相关的控制器、服务和实体
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // 用户实体
import { UserService } from './user.service'; // 用户服务
import { UserController } from './user.controller'; // 用户控制器

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 注册用户实体
  controllers: [UserController], // 注册用户控制器
  providers: [UserService], // 注册用户服务
  exports: [UserService], // 导出用户服务，便于其他模块使用
})
export class UsersModule {}
