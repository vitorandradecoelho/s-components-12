import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { dts } from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      postcss({
        config: {
          path: './postcss.config.js'
        },
        extract: 'styles.css',
        minimize: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      }),
    ],
    external: [
      'react', 
      'react-dom', 
      'leaflet', 
      'leaflet/dist/leaflet.css', 
      'date-fns', 
      'date-fns/locale', 
      'lucide-react',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];