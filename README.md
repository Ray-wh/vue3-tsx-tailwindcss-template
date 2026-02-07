# Vue3 + TSX + TailwindCSS + Pinia 模板

一个现代化的 Vue3 前端项目模板，采用 TSX 语法、TailwindCSS 样式和 Pinia 状态管理，集成了完整的开发工具链和最佳实践。

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
- **Arco Design** - 企业级 UI 组件库
- **pnpm** - 快速的包管理器

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

项目已包含 `.env.development` 和 `.env.production` 文件，可根据需要修改配置：

- `VITE_SENTRY_DSN` - Sentry 错误监控 DSN
- `VITE_API_BASE_URL` - API 基础地址

### 开发模式

```bash
pnpm run dev
```

### 生产构建

```bash
pnpm run build
```

### 预览生产构建

```bash
pnpm run preview
```

### 代码检查

```bash
pnpm run lint
pnpm run stylelint
pnpm run prettier
```

## 项目结构

```
src/
├── assets/       # 静态资源
│   └── style/
│       └── tailwind.css
├── core/         # 核心功能
│   ├── api/      # API 接口定义
│   ├── router/   # 路由配置
│   ├── stores/   # Pinia 状态管理
│   └── utils/    # 工具函数
├── directives/   # 自定义指令
├── hooks/        # 自定义 Hooks
├── layouts/      # 布局组件
├── types/        # TypeScript 类型定义
├── views/        # 页面组件
└── main.tsx      # 入口文件
```

## 核心功能

### 自定义指令

- `v-click-outside` - 点击外部关闭
- `v-copy` - 复制文本到剪贴板
- `v-debounce` - 防抖
- `v-focus` - 自动聚焦
- `v-throttle` - 节流

### 自定义 Hooks

- `useFetch` - 数据获取 Hook
- `useMousePosition` - 鼠标位置 Hook

### 布局组件

- `default` - 默认布局
- `admin` - 管理后台布局
- `public` - 公共布局

### 状态管理

- `user` - 用户状态管理（支持持久化）

### API 请求

封装了 Axios，支持请求拦截、响应拦截和错误处理。

### 错误监控

集成了 Sentry，支持生产环境错误监控。

## 后端项目

后端项目位于 `backend/` 目录，采用 NestJS + TypeORM + JWT 认证。

### 后端快速开始

```bash
cd backend
pnpm install
pnpm run start:dev
```

## 部署

### 前端部署

```bash
pnpm run build
# 将 dist 目录部署到 Nginx 或 CDN
```

### 后端部署

```bash
cd backend
pnpm run build
pm2 start dist/main.js --name nestjs-api
```

## 开发工具

- **ESLint** - 代码质量检查
- **StyleLint** - CSS 样式检查
- **Prettier** - 代码格式化
- **Husky** - Git 提交钩子
- **CommitLint** - 提交信息规范检查

## 许可证

MIT License
