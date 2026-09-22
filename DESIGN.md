# DESIGN.md — 个人站设计系统（方向：D 封面 × B 编辑网格）

## 1. 视觉主题与氛围

时尚杂志式个人站：首屏是全屏黑底「杂志封面」（冲击力），向下滑入浅色纸感的编辑网格区（理性阅读）。气质：克制但张扬——封面敢用超大衬线和 pink 色块，正文区回到 hairline 细线的秩序。三拨盘：视觉冒险度 8 / 动效强度 5 / 信息密度 3。

## 2. 色板与角色

| Token | 值 | 角色 |
|---|---|---|
| `--ink` | `#141414` | 封面底色、正文主色 |
| `--paper` | `#faf9f7` | 浅色区底（暖灰纸感，非纯白） |
| `--gray-mid` | `#6f6a63` | 次要文字（浅底） |
| `--gray-dim-dark` | `rgba(245,243,240,.66)` | 次要文字（深底，≥.60 红线） |
| `--hairline` | `#dcd8d1` | 1px 细线 |
| `--pink` | `#f2b8c6` | 唯一重音：选中态、hover 下划线、分类标签底、封面期号块 |

禁：纯黑 #000、紫蓝渐变、外发光、第三种彩色。

## 3. 排版规则

- 西文标题：Playfair Display（Google Fonts，weights 400–800）；正文中文：系统栈（PingFang SC → Microsoft YaHei → Noto Sans SC）
- meta/标签/日期：等宽 ui-monospace, SFMono-Regular, 12–13px，`font-variant-numeric: tabular-nums`
- H1：clamp(3rem, 8vw, 7rem)，≤2-3 行；标题 `text-wrap: balance`
- 禁斜体（P-1 硬禁令）；强调只用字重/pink/字号
- 中文正文行高 1.5–1.75、≥14px、字重 400/500/600

## 4. 组件样式

- **导航**：mono 小字号、大写字距；深色封面区反白，浅色区转 ink；激活项 pink 下划线（非竖线、非色块）
- **文章卡**：无卡片盒，hairline `border-top` 分隔；日期+分类+标签 mono meta 行 + 衬线标题 + 两行截断摘要（`-webkit-line-clamp: 2`）
- **项目卡**：可点整卡跳外链（`target=_blank rel=noopener`），hover 时标题出现 pink 下划线、箭头位移 4px
- **社交排**：mono 缩写词（GH / X / EMAIL），hairline 分隔
- 直角，零圆角，零阴影模糊

## 5. 布局原则

- 封面：全屏 `min-height: 100dvh` 黑底，大标题占左 2/3，非对称；pink 期号块 + 社交排
- 阅读区：`max-width: 72rem` 居中，编辑式分栏 hairline 网格；文章列表单列窄栏
- 留白节奏：section 间 96–160px（桌面）/ 64px（移动）；<768px 全部塌缩单列

## 6. 深度层级

平面印刷质感，无 z 轴堆叠：层级只靠明度（深底 vs 纸底）、hairline、字重。modal 才允许遮罩 `rgba(20,20,20,.55)`。

## 7. Do's / Don'ts

- Do：::selection pink、focus-visible pink 2px 偏移环、hover 下划线从左展开、封面滚动显现（IntersectionObserver，一次性）
- Don't：斜体、左侧竖线色条（P-38）、卡片阴影、圆角、`transition: all`、`ease-in` UI、`scale(0)` 入场、正文区纹理 >3%
- 深底正文 `rgba(245,243,240,.85)` 以上

## 8. 响应式

- <768px：封面单列、标题降档 clamp 自动缩、meta 行换行、导航折叠为单行滚动或紧凑排
- 全部 `min-height` 不用 `h-screen`；flex 文本子项 `min-width: 0`

## 9. Motion 哲学

丝滑但克制：封面入场标题 8px 上移 + 淡入（600ms，`cubic-bezier(0.23,1,0.32,1)`）；滚动到浅色区时内容 12px 上移显现（一次性，stagger 60ms）；hover 下划线 `transform: scaleX` 240ms；全部包 `prefers-reduced-motion` 兜底与 `@media (hover:hover)`。

## 6. 迁移组件（2026-09-22，自老 Portfolio 合并）

- **stagger 错峰入场**：`.stagger[data-d="1|2|3"]`（80/160/240ms delay），与 `.reveal` 共用 IntersectionObserver；替代老站 fade-up d1/d2/d3
- **简历页 `/resume/`**：`cv-paper` 容器 + `.cv-section/.cv-label`（mono 大写 + hairline 底线）+ `.cv-item-bullets`（disc 列表，strong 用 ink）+ `.skill-tag`（hairline 边框胶囊，无底色）+ `.resume-slogan`（pink 左竖线引言）；不设导航 tab，入口在关于页 cv-entry 区块
- **关于页手风琴**：`<details>.acc` 原生语义 + 自绘加减 icon（scaleY 消失动画）+ summary 引号文案用 `--font-display`
- **足迹地图 FootprintMap**：简笔欧洲 SVG（hairline 描线）+ `.fp-poi-dot` pink 呼吸圆点（poiPulse 2.2s）+ hover 墨底标签；城市数据写死在组件 PLACES 数组，加城市改这一处
- 「思考」「研究」类文章：正文直接短文成篇；研究类文内放完整版外链
