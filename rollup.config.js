import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const banner = `/*!
 * custom-console
 * (c) 2025 dw
 * Released under the MIT License.
 */`;

export default [
  // 压缩混淆构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'esm',
        sourcemap: false,
        banner
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser({
        format: {
          comments: /^!/
        }
      })
    ],
    external: []
  },
  // UMD 构建（压缩）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        name: 'window',
        sourcemap: false,
        banner
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser({
        format: {
          comments: /^!/
        }
      })
    ],
    external: []
  }
];
