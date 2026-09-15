# 个人站

黑白灰 + baby pink 的杂志式个人站。Astro 静态构建，写 Markdown 发文。

## 日常只碰这两个地方

### 1. `src/config.ts` —— 站点身份（改一次管全站）

名字、一句话签名、社交链接、页脚小字、封面期号，全在这一个文件里，带中文注释，改完保存即生效。

### 2. `src/content/posts/` —— 写文章

新建 `.md` 文件，开头照抄：

```markdown
---
title: 文章标题
excerpt: 一句话摘要（列表页显示，两行截断）
date: "2026-09-20"
category: 随笔
tags: ["标签1", "标签2"]
---

正文随意。
```

## 偶尔碰

- **项目卡**：`src/data/projects.json`——名称、描述、外链、年份、截图路径；真实截图放 `public/images/projects/`（横版 16:9）
- **关于页简介**：`src/pages/about.astro` 中间两段文字
- **设计系统**：`DESIGN.md`（改视觉风格先读它）；颜色/字体变量在 `src/styles/global.css`

## 命令

```bash
npm run dev    # 本地预览 http://localhost:4321
npm run build  # 构建到 dist/，可部署任何静态托管
```

## 部署

推荐 Vercel：GitHub 建仓推上去 → vercel.com 导入 → 零配置上线。
