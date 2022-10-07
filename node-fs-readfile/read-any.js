const fs = require('fs');
const argv = process.argv;
const currentFile = argv[2];

fs.readFile(currentFile, 'utf8', (err, data) => {
  if (err) throw err;
  if (currentFile) {
    console.log(data);
  }
});
