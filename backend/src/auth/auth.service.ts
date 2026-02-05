import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // 暂时注释掉数据库依赖，等数据库准备好后再启用
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // 暂时返回模拟数据，等数据库准备好后再实现真实逻辑
    const { username, password, role } = registerDto;

    // 生成token
    const payload = { username, sub: 1, role };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: 1,
        username,
        role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User,
    };
  }

  async login(loginDto: LoginDto) {
    // 暂时返回模拟数据，等数据库准备好后再实现真实逻辑
    const { username, password } = loginDto;

    // 模拟验证
    if (!username || !password) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 生成token
    const payload = { username, sub: 1, role: 'admin' };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: 1,
        username,
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User,
    };
  }

  async validateUser(username: string): Promise<User | null> {
    // 暂时返回模拟数据
    if (username) {
      return {
        id: 1,
        username,
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;
    }
    return null;
  }
}
