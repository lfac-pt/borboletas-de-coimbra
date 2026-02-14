import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Borboletas de Coimbra',
    favicon: './public/favicon.webp',
    tags: isProd
      ? [
        {
          tag: 'script',
          attrs: {
            'data-goatcounter': 'https://borboletas-de-coimbra.goatcounter.com/count',
            async: true,
            src: '//gc.zgo.at/count.js',
          },
        },
      ]
      : [],
  },
  output: {
    assetPrefix: isProd ? '/borboletas-de-coimbra/' : '/',
  },
});
