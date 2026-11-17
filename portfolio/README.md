# 陶诗曼 | 个人作品集网站

> 商业分析与运营策略作品集 —— 用数据发现问题，用商业分析形成判断，用策略和工具推动落地。

基于 **Vite + 原生 JavaScript（多页面应用）** 构建，无前端框架运行时依赖，静态部署友好。

## 技术栈

- Vite 5（开发服务器 / 构建）
- 原生 HTML + CSS + JavaScript（模块化，交互集中在 `src/main.js`）
- 无 React / TypeScript 运行时 —— 保持轻量，降低维护成本

## 目录结构

```
portfolio/
  index.html              首页（Hero / About / Selected Works / Experience / Contact）
  projects/               5 个项目详情页
    xiaohongshu.html      小红书电商行业运营与增长策略（重点案例）
    feishu.html           飞书党支部智能加分管理系统
    crossborder.html      潮汕手钩花跨境电商出海方案
    ecommerce.html        电商平台用户行为与销售表现分析
    aiindustry.html       AI 大模型行业研究
  src/
    main.js               全局交互（导航/筛选/渐入/数字动画/图片放大/移动端菜单）
    styles/               分模块样式（base/nav/hero/about/works/experience/project）
    assets/               项目图片（构建时自动哈希并输出到 dist/assets）
  public/
    resume.pdf            简历下载文件
  vite.config.js          多页面构建配置
```

## 本地开发

```bash
cd portfolio
npm install
npm run dev        # 启动开发服务器，默认 http://localhost:5173
```

## 构建与预览

```bash
cd portfolio
npm run build      # 输出静态产物到 dist/
npm run preview    # 本地预览构建产物
```

## 部署

`dist/` 为纯静态产物，可直接托管到任意静态服务（GitHub Pages、Netlify、Vercel、Nginx 等）。

GitHub Actions 工作流（`.github/workflows/deploy.yml`）已配置为：自动在 `portfolio/` 中执行构建，并将 `portfolio/dist/` 发布到 GitHub Pages。

## 内容更新

- **简历信息 / 项目文案**：直接编辑 `index.html` 与 `projects/*.html`，文案集中在对应页面的结构化区块中。
- **简历下载文件**：替换 `public/resume.pdf`（建议保持同名，否则需同步修改各页面的下载链接）。
- **项目图片**：将新图片放入 `src/assets/`，在页面中通过 `<img class="shot-img" src="../src/assets/文件名" loading="lazy" data-zoom />` 引用；`data-zoom` 会启用点击放大（Lightbox）。

## 待补充事项

- 飞书系统的「自动化流程配置」「审核与公示页面」两张截图（当前为占位区）。
- 小红书案例中的经营漏斗 / CTR 对比数据图表（当前以指标卡片呈现，可后续补充图表）。
- 简历头像 `src/assets/avatar.jpg` 体积较大（约 2MB），建议压缩为 WebP 以优化首屏加载。

## 数据准确性说明

内容以最新版简历（`陶诗曼-武汉大学-财务管理-2028届-实习6个月.docx`）为准，关键数据：GPA 3.98/4.0、CET-6 590、小红书实习 2026.06—2026.09、飞书系统为独立搭建。
