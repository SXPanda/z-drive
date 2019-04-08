const { ipcMain } = require('electron');
const fs = require('fs');

const { Storage } = require('@google-cloud/storage');

ipcMain.on('googlecloud/download', async (event, srcFilename) => {
  // Creates a client
  const storage = new Storage();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */

  const bucketName = 'redshift-zdrive';
  const destFilename = `./local/${srcFilename}`;

  const destFileParts = destFilename.split('/');

  const fileParts = [];
  while (destFileParts.length > 1) {
    fileParts.push(destFileParts.shift());
    console.log(`./${fileParts.join('/')}`);
    if (!fs.existsSync(`./${fileParts.join('/')}`)) {
      fs.mkdirSync(`./${fileParts.join('/')}`);
    }
  }

  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: destFilename,
  };

  console.log(destFilename);
  fs.writeFile(destFilename, '', () => {
    // Downloads the file
    storage
      .bucket(bucketName)
      .file(srcFilename)
      .download(options);

    console.log(`gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`);
  });
});
