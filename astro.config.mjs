// @ts-check
import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit';

// GitHub Pages 子路径部署：给 markdown 里的根相对图片路径加 base 前缀
function rehypeBasePath() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const src = node.properties?.src;
        if (typeof src === 'string' && src.startsWith('/')) {
          node.properties.src = '/chengsiyu-site' + src;
        }
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://chengsiyu-web.github.io",
  base: "/chengsiyu-site",
  markdown: {
    rehypePlugins: [rehypeBasePath],
  },
});
