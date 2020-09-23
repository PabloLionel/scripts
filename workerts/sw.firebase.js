//java/com/google/firebase/console/server/main/pwa/serviceworker/static_caching.js
/**
 * @fileoverview This file contains the logic for the Firebase Console's Service
 * worker
 */

importScripts(
    'https://unpkg.com/workbox-sw@1.0.1/build/importScripts/workbox-sw.prod.v1.0.1.js');
importScripts(
    'https://unpkg.com/workbox-runtime-caching@1.0.0/build/importScripts/workbox-runtime-caching.prod.v1.0.0.js');
importScripts(
    'https://unpkg.com/workbox-google-analytics@1.0.0/build/importScripts/workbox-google-analytics.prod.v1.0.0.js');

const workboxSW = new self.WorkboxSW();

/**
 * workbox.googleAnalytics  caches user actions that occur offline
 * and logs them when connection is re-established.
 */
workbox.googleAnalytics.initialize();

const cacheFirst = new workbox.runtimeCaching.CacheFirst();
const cacheFirstRoutes = [
  /https:\/\/fonts\.googleapis\.com.*/, /https:\/\/fonts\.gstatic\.com.*/,
  /https:\/\/www\.gstatic\.com\/mobilesdk.*/,
  'https://www.google.com/js/gweb/analytics/autotrack.js',
  'https://apis.google.com/js/client.js', '/warm_welcome.png',
  'https://apis.google.com/js/googleapis.proxy.js',
  'https://ssl.google-analytics.com/ga.js',
];
cacheFirstRoutes.forEach(
    route => workboxSW.router.registerRoute(route, cacheFirst));

const networkFirst = new workbox.runtimeCaching.NetworkFirst();
const networkFirstRoutes = [
  /\/_\/fireconsole\/_\/(js|ss)\/.*/,
];
networkFirstRoutes.forEach(
    route => workboxSW.router.registerRoute(route, networkFirst));

const staleWhileRevalidate = new workbox.runtimeCaching.StaleWhileRevalidate();
const staleWhileRevalidateRoutes = [
  /https:\/\/www\.googletagmanager\.com\/gtm\.js.*/,
  /https:\/\/www\.gstatic\.com\/og.*/,
  /https:\/\/apis\.google\.com\/_\/scs\/abc-static.*/,
  /https:\/\/.*\.google\.com\/.*\/project\/.*\/overview/,
];
staleWhileRevalidateRoutes.forEach(
    route => workboxSW.router.registerRoute(route, staleWhileRevalidate));

//java/com/google/firebase/console/server/main/pwa/serviceworker/push_notifications.js
/**
 * @fileoverview This file contains the logic required to send push
 * notifications from the ServiceWorker.
 */
'use strict';

self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  var data = {};
  if (event.data) {
    data = event.data;
  }
  const title = data.title || 'Demo Push';
  const message = data.message || 'Mockup Message Here';
  const iconPrefix = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/';
  const iconUrl = iconPrefix + '2x/firebase_28dp.png';

  const options =  {
    body: message,
    tag: 'Firebase',
    icon: iconUrl,
    badge: iconUrl
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://console.firebase.google.com')
  );
});

//java/com/google/firebase/console/server/main/pwa/serviceworker/finalize.js
/**
 * @fileoverview In this file we install and activate the service worker.
 */

self.addEventListener('install', (event) => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

