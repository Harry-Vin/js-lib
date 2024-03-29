import typescript from '@rollup/plugin-typescript';

export default {
    input: [
        'src/index.ts',
    ],
    output: [
        {
            // name: 'index.js',
            format: 'es',
            dir: 'build'
        }
    ],
    plugins: [
        typescript()
    ],
    external: ['crypto-js'],
}
