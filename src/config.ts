// ─────────────────────────────────────────────
// 站点配置 —— 改这里就够了
// 名字、签名、社交链接、页脚，全部在这一处改。
// 改完保存，浏览器自动刷新。
// ─────────────────────────────────────────────

export const site = {
  // 你的名字（首页大标题会拆成两行，第二行显示为粉色）
  // 保持 [firstName, lastName] 两个词的写法
  firstName: "Siyu",
  lastName: "Cheng",

  // 一句话签名（首页封面上名字下面那行）
  tagline: "今天又在想什么",

  // 网站描述（给搜索引擎看的）
  description: "Siyucheng的个人站",

  // 社交链接（label 显示为大写缩写，href 填地址）
  // 不想要的整行删掉即可；邮箱的 href 写成 "mailto:你的邮箱"
  socials: [
    { label: "GITHUB", href: "https://github.com/yourname" },
    { label: "EMAIL", href: "15701601901@163.com" },
  ],

  // 页脚那行小字
  footerNote: "用衬线字和 pink 认真排过版",

  // 封面期号块（每出一个"期"改一次，纯粹好玩）
  issue: "ISSUE 001 — 2026",
};
