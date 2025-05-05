import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
				navigateFallback: '/offline.html',
			},
			manifest: {
				name: 'Rick and Morty',
				short_name: 'Rick&Morty',
				start_url: '/index.html',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#ffffff',
				orientation: 'portrait-primary',
				icons: [
					{
						src: 'public/assets/icons/icon-48x48.png',
						type: 'image/png',
						sizes: '48x48',
					},
					{
						src: 'public/assets/icons/icon-72x72.png',
						type: 'image/png',
						sizes: '72x72',
					},
					{
						src: 'public/assets/icons/icon-128x128.png',
						type: 'image/png',
						sizes: '128x128',
					},
					{
						src: 'public/assets/icons/icon-144x144.png',
						type: 'image/png',
						sizes: '144x144',
					},
					{
						src: 'public/assets/icons/icon-152x152.png',
						type: 'image/png',
						sizes: '152x152',
					},
					{
						src: 'public/assets/icons/icon-192x192.png',
						type: 'image/png',
						sizes: '192x192',
						purpose: 'any maskable',
					},
					{
						src: 'public/assets/icons/icon-384x384.png',
						type: 'image/png',
						sizes: '384x384',
					},
					{
						src: 'public/assets/icons/icon-512x512.png',
						type: 'image/png',
						sizes: '512x512',
					},
				],
				description: 'Rick and Morty information',
			},
		}),
	],
	server: {
		port: 3000,
		open: true,
	},
});
