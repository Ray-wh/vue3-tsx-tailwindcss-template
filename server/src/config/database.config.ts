import { registerAs } from '@nestjs/config';

/**
 * 数据库配置文件
 * 使用 registerAs 注册配置，符合 NestJS 最佳实践
 * 支持环境变量和默认值，根据 NODE_ENV 自动配置
 */
export default registerAs('database', () => ({
  // 数据库类型
  type: 'mysql',
  // 数据库主机地址
  host: process.env.DB_HOST || 'localhost',
  // 数据库端口
  port: parseInt(process.env.DB_PORT || '3306', 10),
  // 数据库用户名
  username: process.env.DB_USERNAME || 'root',
  // 数据库密码
  password: process.env.DB_PASSWORD || '',
  // 数据库名称
  database: process.env.DB_DATABASE || 'test',
  // 是否自动同步数据库表结构（生产环境建议关闭）
  synchronize: process.env.NODE_ENV !== 'production',
  // 是否开启日志（生产环境建议关闭）
  logging: process.env.NODE_ENV !== 'production',
  // 自动扫描所有实体文件
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
}));
