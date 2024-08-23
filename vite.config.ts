import { AliasOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

const root = path.resolve(__dirname, 'src');

dotenv.config();

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': root
        } as AliasOptions
    },
    define: {
        'process.env': process.env
    }
});
