import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: [{ username: userData.username }, { email: userData.email }],
    });

    if (existingUser) {
      if (existingUser.username === userData.username) {
        throw new ConflictException('用户名已存在');
      }
      if (existingUser.email === userData.email) {
        throw new ConflictException('邮箱已存在');
      }
    }

    // 加密密码
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    // 如果更新密码，需要加密
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // 如果更新用户名或邮箱，需要检查是否已存在
    if (userData.username || userData.email) {
      const existingUser = await this.userRepository.findOne({
        where: [
          { username: userData.username, id: notEqual(id) },
          { email: userData.email, id: notEqual(id) },
        ],
      });

      if (existingUser) {
        if (existingUser.username === userData.username) {
          throw new ConflictException('用户名已存在');
        }
        if (existingUser.email === userData.email) {
          throw new ConflictException('邮箱已存在');
        }
      }
    }

    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}

// 辅助函数，用于TypeORM查询中的不等于操作
function notEqual(value: any) {
  return Not(value);
}

// 导入Not操作符
import { Not } from 'typeorm';
