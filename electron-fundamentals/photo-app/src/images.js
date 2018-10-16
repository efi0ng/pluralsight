const path = require('path');
const fs = require('fs');

let photosPath = null;

function getPicturesDir(app) {
  return path.join(app.getPath('pictures'),"photo-app");
}

function init(app) {
  photosPath = getPicturesDir(app);
  mkdir(photosPath);
}

function mkdir(dir) {
  fs.stat(dir, (err, stats) => {
    if (err && err.code !== 'ENOENT') {
      return logFileCallback(dir, err);
    } else if (err || !stats.isDirectory()) {
      fs.mkdir(dir, (err) => { logFileCallback(dir, err); });
    }
  });
}

function genFilename() {
  return (new Date()).toISOString().replace(/[-:.TZ]/g,"") + ".png";
}

function logFileCallback(fileName, err) {
  if (err) {
    console.error('Failed accessing: ',fileName,'\n',err);
  }
}

function save(bytes) {
  const base64data = bytes.replace(/^data:image\/png;base64,/,'');
  let fileName = path.join(photosPath,genFilename());
  fs.writeFile(fileName, base64data, {
    encoding: 'base64'
  }, (err) => {
    logFileCallback(fileName, err);
  });
}

module.exports = {
  init: init,
  save: save,
  getPicturesDir: getPicturesDir
};
