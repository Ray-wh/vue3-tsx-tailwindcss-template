# NestJS 后端服务

基于 NestJS 的企业级后端服务，采用 TypeORM + MySQL + JWT 认证，提供完整的用户管理功能。

## 技术栈

- **NestJS** - Node.js 企业级框架
- **TypeORM** - TypeScript ORM
- **MySQL** - 关系型数据库
- **JWT** - JSON Web Token 认证
- **Passport** - 认证中间件
- **bcryptjs** - 密码加密
- **class-validator** - 数据验证
- **class-transformer** - 数据转换

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

创建 `.env` 文件并配置以下变量：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=your_database

# 服务配置
PORT=3000
NODE_ENV=development
```

### 开发模式

```bash
pnpm run start:dev
```

服务将在 `http://localhost:3000/api` 启动。

### 生产模式

```bash
pnpm run build
pnpm run start:prod
```

### 测试

```bash
# 单元测试
pnpm run test

# E2E 测试
pnpm run test:e2e

# 测试覆盖率
pnpm run test:cov
```

### 代码检查

```bash
pnpm run lint
pnpm run format
```

## 项目结构

```
server/
├── src/
│   ├── config/              # 配置文件
│   │   └── database.config.ts  # 数据库配置
│   ├── users/               # 用户模块
│   │   ├── users.module.ts    # 模块定义
│   │   ├── user.controller.ts # 用户控制器
│   │   ├── user.service.ts    # 用户服务
│   │   └── user.entity.ts     # 用户实体
│   ├── app.controller.ts    # 应用控制器
│   ├── app.service.ts       # 应用服务
│   ├── app.module.ts       # 应用根模块
│   └── main.ts            # 应用入口
├── test/                  # 测试文件
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env                   # 环境变量（需自行创建）
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

## 核心功能

### 用户管理

- **创建用户** - POST `/api/users`
- **获取用户列表** - GET `/api/users`
- **获取单个用户** - GET `/api/users/:id`
- **更新用户** - PATCH `/api/users/:id`
- **删除用户** - DELETE `/api/users/:id`

### 用户实体

```typescript
{
  id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 数据库配置

- 自动同步数据库表结构（开发环境）
- 自动扫描所有实体文件
- 支持环境变量配置
- 生产环境自动关闭日志和同步

### CORS 配置

支持以下来源的跨域请求：
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:5173`
- `http://localhost:5174`

### 全局验证

启用全局验证管道，自动验证请求数据。

## API 端点

### 应用端点

- `GET /` - 获取应用信息

### 用户端点

- `POST /api/users` - 创建用户
- `GET /api/users` - 获取所有用户
- `GET /api/users/:id` - 获取指定用户
- `PATCH /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

## 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Jest** - 单元测试框架
- **TypeScript** - 类型检查

## 部署

### 构建项目

```bash
pnpm run build
```

### 使用 PM2 部署

```bash
pm2 start dist/main.js --name nestjs-api
```

### 使用 Docker 部署（可选）

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]
```

## 数据库配置

### MySQL 安装

```bash
# macOS
brew install mysql

# Ubuntu
sudo apt-get install mysql-server

# Windows
# 下载并安装 MySQL Installer
```

### 创建数据库

```sql
CREATE DATABASE your_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 常见问题

### 数据库连接失败

检查 `.env` 文件中的数据库配置是否正确。

### 端口被占用

修改 `.env` 文件中的 `PORT` 变量。

### CORS 错误

确保前端地址已添加到 CORS 配置中。

## 扩展功能

### 添加 JWT 认证

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
```

### 添加 Swagger 文档

```bash
npm install @nestjs/swagger
```

在 `main.ts` 中配置：

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('API 文档')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

## 许可证

UNLICENSED