const sharp = require('sharp');
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
  const photo = landmark.get('photo');
  const currentPhoto = request.original.get('photo');

  if (!photo) return;

  // if operation is delete dont process photo.
  if (
    request.object.toJSON()?.photo?.__op === 'Delete' ||
    request.object.toJSON()?.photo_thumb?.__op === 'Delete'
  ) {
    return;
  }

  // check if file changed
  // updates quicker if no file uploaded
  if (photo.name() === currentPhoto?.name()) return;

  const photoBase64 = await photo.getData();
  const buffer = Buffer.from(photoBase64, 'base64');

  const shrinkedFileData = await sharp(buffer).resize(250, 250).jpeg().toBuffer();
  const base64Data = shrinkedFileData.toString('base64');

  const thumbFile = new Parse.File(photo.name(), { base64: base64Data });
  await thumbFile.save();

  landmark.set('photo_thumb', thumbFile);
});
