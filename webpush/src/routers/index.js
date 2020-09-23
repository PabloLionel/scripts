const { Router } = require('express');
const webpush = require('../webpush');

const router = Router();

/**
 * Escuchar la primera conexión
 * con el usuario, haciendo un
 * post.
 */
router.post('/subscription', (req, res) => {
  console.log(req.body);
  res.status(200).json({ finalize: true });
});
router.get('/webpush', (req, res) => {
  console.log(req.body);
  res.status(200).json({ PUBLIC_VAPID_KEY: webpush.PUBLIC_VAPID_KEY });
});

module.exports = router;
