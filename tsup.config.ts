import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // 替换为你的实际入口文件
  outDir: 'dist',
  format: ['cjs', 'esm',], // 同时构建CommonJS和ES模块
  minify: true, // 压缩代码
  sourcemap: true, // 生成sourcemap
  clean: true, // 构建前清理dist目录
  dts: true, // 自动生成类型声明文件
  // 确保依赖被正确打包，解决之前的gradient-string问题
  external: [], // 不排除任何依赖，全部打包进产物
});
