const path = require('path');

const bytesToMegaBytes = bytes => bytes / (1024 * 1024);

const getFileExtension = filename => filename.substr(1);

const getFilenameWithoutExt = filename => path.basename(filename, getFileExtension(filename));

const sanitizeFilename = filename => filename.replace(/[/\\?%*:|"<>\(\)]/g, '-');

module.exports = {
  bytesToMegaBytes,
  getFileExtension,
  getFilenameWithoutExt,
  sanitizeFilename,
};
