import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Borboletas de Coimbra',
    favicon: './public/favicon.png',
  },
  output: {
    assetPrefix: process.env.NODE_ENV === 'production' ? '/borboletas-de-coimbra/' : '/',
  },
});
