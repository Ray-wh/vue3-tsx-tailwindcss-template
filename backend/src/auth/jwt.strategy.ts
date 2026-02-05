import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() // 暂时注释掉数据库依赖，等数据库准备好后再启用
  // @InjectRepository(User)
  // private userRepository: Repository<User>,
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const { username } = payload;

    // 暂时返回模拟数据，等数据库准备好后再实现真实逻辑
    if (!username) {
      throw new UnauthorizedException();
    }

    return {
      id: 1,
      username,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
  }
}
