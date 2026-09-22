// ─────────────────────────────────────────────
// 站点配置 —— 改这里就够了
// 名字、签名、社交链接、页脚，全部在这一处改。
// 改完保存，浏览器自动刷新。
// ─────────────────────────────────────────────

export const site = {
  // 首页大标题（一行写完，pinkWord 部分显示为粉色）
  greetingLead: "Hi",
  pinkWord: "There",

  // 你的名字（Hero 介绍行和页面标题用）
  firstName: "Siyu",
  lastName: "Cheng",

  // 一句话身份（Hero 介绍行，名字后面）
  tagline: "欢迎来到我的小世界。努力成为生活体验家和世界探索者，会把一些文字和正在做的新东西放在这里。",

  // 正在做什么（Hero 的 NOW 行，粉色 NOW 标签 + 一句话）
  now: "用 AI 探索不同产品的无限可能",

  // 网站描述（给搜索引擎看的）
  description: "Siyucheng的个人站",

  // 社交链接（label 是前缀小字，display 是外显的地址文字，href 是实际跳转链接）
  // 不想要的整行删掉即可
  socials: [
    { label: "GITHUB", display: "github.com/Chengsiyu-web", href: "https://github.com/Chengsiyu-web" },
    { label: "EMAIL", display: "15701601901@163.com", href: "mailto:15701601901@163.com" },
  ],

  // 页脚那行小字
  footerNote: "用衬线字和 pink 认真排过版",

  // 封面期号块（每出一个"期"改一次，纯粹好玩）
  issue: "FROM2004--",
};
