# Task Manager（任务管理系统）

一个基于 **Vue 3** 的前后端分离任务管理应用，覆盖登录鉴权、任务 CRUD、筛选与本地持久化。用于练习 Vue 工程化、HTTP 分层与部署流程。

## ✨ 功能

- 🔐 登录 / 退出（本地 mock 鉴权，token 存 localStorage）
- ✅ 任务增删改查（添加、删除、编辑、完成状态切换）
- 🔍 任务筛选（全部 / 已完成 / 未完成）
- 🧹 一键清除已完成任务
- 📊 完成数量统计
- 💾 **双存储模式**：本地开发走 json-server mock 后端；线上部署自动降级 localStorage，保证完整可用

## 🛠 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 构建 | Vite |
| 状态管理 | Pinia |
| 路由 | Vue Router |
| HTTP | Axios（请求/响应拦截器） |
| 后端（开发） | json-server（mock） |
| 测试 | Vitest |

## 📁 项目结构

```
src/
├─ api/          # API 请求函数
├─ service/      # 业务层（可切换 API / localStorage 模式）
├─ stores/       # Pinia 状态
├─ utils/        # 工具（request 封装、storage、error）
├─ constants/    # 常量
├─ components/   # 通用组件
├─ layouts/      # 布局
├─ views/        # 页面
└─ router/       # 路由
```

## 🚀 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 启动 mock 后端（端口 3000）
npm run mock

# 3. 另开终端启动前端（端口 5173）
npm run dev
```

访问 http://localhost:5173 ，任意输入用户名即可登录。

## ☁️ 部署说明

线上部署（如 Vercel）时，由于没有后端，通过环境变量切换到本地存储模式：

```
VITE_USE_LOCAL_STORAGE=true
```

配置后，任务数据会持久化到浏览器 localStorage，无需后端即可完整使用。

## 🧪 测试

```bash
npm run test
```

## 📸 截图

> TODO：待补充项目截图

---

*学习项目：Vue 3 前端工程化练习*
