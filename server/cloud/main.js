// const { Parse } = require('../node_modules/parse/node');
const sharp = require('sharp');

// Parse.Cloud.beforeSave('DumbaiLandmarks', request => {
//   console.log(request);
//   const photo = request.object.get('photo');
//   const data = sharp(photo).resize(250, 250).jpeg().toBuffer();
//   request.object.set('photo_thumb', data);
// });

const fs = require('fs/promises');

Parse.Cloud.beforeSave('DubaiLandmarks', async (request, response) => {
  const landmark = request.object;
  const picture = landmark.get('photo');
  const pictureBase64 = await picture.getData();

  const buffer = Buffer.from(pictureBase64, 'base64');

  const shrinkedFileData = await sharp(buffer).resize(250, 250).jpeg().toBuffer();
  const base64Data = shrinkedFileData.toString('base64');

  const thumbFile = new Parse.File(picture.name(), { base64: base64Data });
  await thumbFile.save();

  const photoFile = new Parse.File(picture.name(), { base64: pictureBase64 });
  await photoFile.save();

  landmark.set('photo_thumb', thumbFile);
  landmark.set('photo', photoFile);
});

// Parse.
// Returning an already saved file
// Parse.Cloud.beforeSaveFile((request) => {
//   const { user } = request;
//   const avatar = user.get('avatar'); // this is a Parse.File that is already saved to the user object
//   return avatar;
// });

// Saving a different file from uri
// Parse.Cloud.beforeSaveFile((request) => {
//   const newFile = new Parse.File('some-file-name.txt', { uri: 'www.somewhere.com/file.txt' });
//   return newFile;
// });
