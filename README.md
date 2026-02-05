# Vue3 + TSX + TailwindCSS + Pinia 模板

一个现代化的 Vue3 前端项目模板，采用 TSX 语法、TailwindCSS 样式和 Pinia 状态管理。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具
- **TSX** - Vue3 支持的 JSX 语法
- **TailwindCSS** - 实用优先的 CSS 框架
- **Pinia** - Vue 官方状态管理库
- **Vue Router** - Vue 官方路由管理器
- **Axios** - HTTP 客户端
- **Sentry** - 错误监控平台

## 快速开始

### 安装依赖
```bash
npm install
```

### 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，配置 Sentry DSN 和 API 地址
```

### 开发模式
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
npm run stylelint
```

## 项目结构

```
src/
├── api/          # API 接口定义
├── assets/       # 静态资源
├── layouts/      # 布局组件
├── router/       # 路由配置
├── stores/       # Pinia 状态管理
├── types/        # TypeScript 类型定义
├── utils/        # 工具函数
├── views/        # 页面组件
├── App.tsx       # 根组件
└── main.ts       # 入口文件
```

## 后端项目

后端项目位于 `backend/` 目录，采用 NestJS + TypeORM + JWT 认证。

### 后端快速开始
```bash
cd backend
npm install
npm run start:dev
```

## 部署

### 前端部署
```bash
npm run build
# 将 dist 目录部署到 Nginx 或 CDN
```

### 后端部署
```bash
cd backend
npm run build
pm2 start dist/main.js --name nestjs-api
```

## 许可证

MIT License
