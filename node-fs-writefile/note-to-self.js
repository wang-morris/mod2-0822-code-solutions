const fs = require('fs');
const currentFile = process.argv[2];

fs.writeFile('./note.txt', currentFile + '\n', err => {
  if (err) throw err;
});
