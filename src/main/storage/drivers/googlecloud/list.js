const { ipcMain } = require('electron');

const { Storage } = require('@google-cloud/storage');

ipcMain.on('googlecloud/list', async (event) => {
  const storage = new Storage();

  const bucketName = 'redshift-zdrive';

  const [files] = await storage.bucket(bucketName).getFiles();

  const fileList = {
    files: [],
    folders: {},
  };

  files.forEach(file => {
    const fileParts = file.name.split('/');
    let i = 0;
    let directory = fileList;
    while (fileParts.length && i < 100) {
      const filePart = fileParts.shift();
      if (filePart) {
        if (filePart.includes('.')) {
          directory.files.push(filePart);
        } else {
          if (typeof directory.folders[filePart] === 'undefined') {
            directory.folders[filePart] = {
              files: [],
              folders: {},
            };
          }

          directory = directory.folders[filePart];
          i += 1;
        }
      }
    }
  });

  event.sender.send('googlecloud/list/response', fileList);
});
