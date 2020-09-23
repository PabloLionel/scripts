const sharp = require('sharp');
sharp(
  '/mnt/data/workspace/scripts/js/utils/assets/yo.png'
)
  .resize(70, 70)
  .toFile('output.png', (err, info) => {
    console.log(info);
  });
