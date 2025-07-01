/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			/*
			 * We recommend to not use aliases in the lib's source,
			 * because they will leak into the generated d.ts files and then
			 * break the lib's types in the consuming app.
			 */
		},
	},
	build: {
		minify: false,
		lib: {
			name: 'DocumentCore',
			entry: {
				index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
				'builders/index': fileURLToPath(new URL('./src/builders/index.ts', import.meta.url)),
			},
			fileName: (_format, entryName) => `${entryName}.mjs`,
			formats: ['es'],
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				banner: `
/**
 *  Copyright ${new Date(Date.now()).getFullYear()} Bryce
 *  @license MIT
**/
`,
				exports: 'auto',
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	test: {
		environment: 'jsdom',
	},
})
