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
├── api/              # API 接口定义
│   ├── auth.ts
│   └── user.ts
├── assets/           # 静态资源
│   └── style/
│       └── tailwind.css
├── core/             # 核心功能模块
│   ├── components/    # 全局组件
│   │   ├── Empty/
│   │   ├── Loading/
│   │   └── index.ts
│   ├── directives/    # 自定义指令
│   │   ├── v-click-outside.ts
│   │   ├── v-copy.ts
│   │   ├── v-debounce.ts
│   │   ├── v-focus.ts
│   │   ├── v-throttle.ts
│   │   └── index.ts
│   ├── hooks/         # 自定义 Hooks
│   │   ├── types/
│   │   │   └── index.d.ts
│   │   ├── useMousePosition.ts
│   │   └── useRequest.ts
│   ├── http/          # HTTP 请求模块
│   │   ├── types/
│   │   │   └── index.d.ts
│   │   ├── h-config.ts
│   │   ├── h-error-handler.ts
│   │   ├── h-interceptors.ts
│   │   ├── h-methods.ts
│   │   └── index.ts
│   ├── router/        # 路由配置
│   │   ├── types/
│   │   │   └── route-modules.d.ts
│   │   └── index.ts
│   ├── sentry/        # 错误监控
│   │   └── index.ts
│   ├── stores/        # Pinia 状态管理
│   │   ├── types/
│   │   │   └── index.d.ts
│   │   ├── modules/
│   │   │   └── user.ts
│   │   └── index.ts
│   └── token/         # Token 管理
│       ├── types/
│       │   └── index.d.ts
│       └── index.ts
├── layouts/          # 布局组件
│   ├── admin.tsx
│   ├── default.tsx
│   └── public.tsx
├── views/            # 页面组件
│   ├── about/
│   ├── home/
│   ├── index/
│   ├── login/
│   ├── not-found/
│   ├── sentry-test/
│   └── users/
└── main.tsx          # 应用入口
```

## 核心功能

### 自定义指令

- `v-click-outside` - 点击外部关闭
- `v-copy` - 复制文本到剪贴板
- `v-debounce` - 防抖
- `v-focus` - 自动聚焦
- `v-throttle` - 节流

### 自定义 Hooks

- `useRequest` - 数据获取 Hook，支持加载状态和错误处理
- `useMousePosition` - 鼠标位置 Hook

### 布局组件

- `default` - 默认布局（包含导航栏和页脚）
- `admin` - 管理后台布局（无导航、无页脚）
- `public` - 公共布局（无导航、无页脚）

### 状态管理

- `user` - 用户状态管理（支持持久化）

### HTTP 请求

封装了 Axios，支持：
- 请求拦截器（自动添加 Token）
- 响应拦截器（统一错误处理）
- 自定义配置（skipAuth、skipErrorHandler）
- 常用 HTTP 方法（get、post、put、patch、delete）

### Token 管理

统一的 Token 管理服务，支持：
- 自定义 Token 存储键名
- 自定义登录路由
- 自定义存储方式（localStorage/sessionStorage）
- Token 的获取、设置、删除和检查

### 错误监控

集成了 Sentry，支持：
- 生产环境错误监控
- 用户信息追踪
- 会话重放
- 性能监控

## 后端项目

后端项目位于 `server/` 目录，采用 NestJS + TypeORM + MySQL + JWT 认证。

### 后端技术栈

- **NestJS** - Node.js 企业级框架
- **TypeORM** - TypeScript ORM
- **MySQL** - 关系型数据库
- **JWT** - JSON Web Token 认证
- **Passport** - 认证中间件
- **bcryptjs** - 密码加密

### 后端快速开始

```bash
cd server
pnpm install
pnpm run start:dev
```

后端服务将在 `http://localhost:3000/api` 启动。

## 开发工具

- **ESLint** - 代码质量检查
- **StyleLint** - CSS 样式检查
- **Prettier** - 代码格式化
- **Husky** - Git 提交钩子
- **CommitLint** - 提交信息规范检查

## 部署

### 前端部署

```bash
pnpm run build
# 将 dist 目录部署到 Nginx 或 CDN
```

### 后端部署

```bash
cd server
pnpm run build
pm2 start dist/main.js --name nestjs-api
```

## 移动端适配

项目支持使用 Capacitor 打包成原生移动应用（iOS、Android）。

### 安装 Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
npx cap add android
```

### 构建移动应用

```bash
pnpm run build
npx cap sync android
npx cap open android
```

详细配置请参考 Capacitor 官方文档。

## 许可证

MIT License