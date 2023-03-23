// src/sw.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// предварительное кэширование и маршрутизация всех файлов, созданных с помощью workbox-webpack-plugin
precacheAndRoute(self.__WB_MANIFEST);

// определение текущего хоста
const currentHost = new URL(self.location).origin;
console.log(currentHost);
// кэширование запросов к статическим ресурсам
registerRoute(
  new RegExp(`^${currentHost}`),
  new NetworkFirst({
    cacheName: 'static-resources',
    networkTimeoutSeconds: 10,
    maxAgeSeconds: 60 * 60 * 24 * 30,
  }),
);

registerRoute(
  /\.(?:html|css|js)$/,
  new StaleWhileRevalidate({
    cacheName: 'html-css-js',
    maxAgeSeconds: 60 * 60 * 24 * 30,
    networkTimeoutSeconds: 10,
  }),
);
