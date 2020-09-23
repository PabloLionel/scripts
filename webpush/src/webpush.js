const webpush = require('web-push');

/**
 * WebPush se encarga de manejar las conexiones de
 * usuarios, las notificaciones, etc. pero antes
 * necesitamos configurarlo.
 *
 * run: npx web-push generate-vapid-keys
 *
 *  =======================================
 *
 *  Public Key:
 *  BBx3y3qOA86so1hb5MD...
 *
 *  Private Key:
 *  gj4Hjb2I9GIpwm6IivG...
 *
 *  =======================================
 *
 * NOTA:
 *  Usar estas claves en un archivo .env de node.
 *
 * Problea:
 *  web-push: orden no encontrada
 * Solucion:
 *  sudo npm i -g web-push && web-push generate-vapid-keys
 */
// webpush.setGCMAPIKey();
webpush.setVapidDetails(
  // cuenta sobre el origen las notificaciones.
  'mailto:test@myweb.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

webpush.PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY;

module.exports = webpush;
