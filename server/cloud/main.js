const sharp = require('sharp');
const fs = require('fs/promises');
const { bytesToMegaBytes } = require('../helpers');

const MAX_UPLOAD_FILE_SIZE = 5;

Parse.Cloud.beforeSaveFile(async request => {
  // check if uploaded file size is bigger than 5 MB.
  const { fileSize } = request;
  const fileSizeInMB = bytesToMegaBytes(fileSize);

  if (Math.ceil(fileSizeInMB) > MAX_UPLOAD_FILE_SIZE) {
    throw new Parse.Error(400, `You cannot exceed max file size of ${MAX_UPLOAD_FILE_SIZE} MB.`);
  }
});

Parse.Cloud.beforeSave('DubaiLandmarks', async request => {
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
