const { Parse } = require('parse');
const sharp = require('sharp');

Parse.Cloud.beforeSave('DumbaiLandmarks', request => {
  const photo = request.object.get('photo');
  const data = sharp(photo).resize(250, 250).jpeg().toBuffer();
  request.object.set('photo', data);
});
