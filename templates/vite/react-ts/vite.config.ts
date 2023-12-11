import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

// @ts-ignore
import { dependencies } from './package.json';
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/

export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
    chunkSizeWarningLimit: 1500
  },
  plugins: [react(), visualizer({
    template: "sunburst",
    gzipSize: true,
    brotliSize: true,
    filename: "analyse.html",
  }) as PluginOption],
})