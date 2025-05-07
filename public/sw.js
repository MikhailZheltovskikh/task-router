const staticCashName = 'static-site-v2';
const dinamicCashName = 'dinamic-site-v1';

const ASSETS = [
	'/',
	'/index.html',
	'/offline.html',
	'/manifest.json',
	'/assets/icons/icon-192x192.png',
	'/assets/icons/icon-512x512.png',
	'/src/index.css',
	'/src/main.jsx',
	'/src/App.jsx',
	'/src/components/**/*',
	'/src/assets/**/*',
];

//install
self.addEventListener('install', async () => {
	const cache = await caches.open(staticCashName);
	await cache.addAll(ASSETS);
});

//activate
self.addEventListener('activate', async () => {
	const cashesKeysArr = await caches.keys();
	await Promise.all(
		cashesKeysArr
			.filter((key) => key !== staticCashName && key !== dinamicCashName)
			.map((key) => caches.delete(key)),
	);
});

//fetch
self.addEventListener('fetch', (event) => {
	event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
	const cached = await caches.match(request);
	try {
		return (
			cached ??
			(await fetch(request)).then(() => {
				return networkFirst(request);
			})
		);
	} catch (e) {
		console.log(' cacheFirst -> e:', e);
		return networkFirst(request);
	}
}

async function networkFirst(request) {
	const cache = await caches.open(dinamicCashName);
	try {
		const response = await fetch(request);
		await cache.put(request, response.clone());
		return response;
	} catch (e) {
		console.log(' networkFirst -> e:', e);
		const cached = await caches.match(request);
		return cached ?? caches.match('/offline.html');
	}
}
