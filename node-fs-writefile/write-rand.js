const fs = require('fs');

fs.writeFile('./random.txt', Math.random() + '\n', err => {
  if (err) throw err;
});
