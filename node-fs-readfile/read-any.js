const fs = require('fs');
const argv = process.argv;
const currentFile = argv[2];

fs.readFile('./hopper.txt', 'utf8', (err, data) => {
  if (err) throw err;
  if (currentFile === 'hopper.txt') {
    console.log(data);
  }
});

fs.readFile('./cunningham.txt', 'utf8', (err, data) => {
  if (err) throw err;
  if (currentFile === 'cunningham.txt') {
    console.log(data);
  }
});

fs.readFile('./hipster-ipsum.txt', 'utf8', (err, data) => {
  if (err) throw err;
  if (currentFile === 'hipster-ipsum.txt') {
    console.log(data);
  }
});

fs.readFile('./dijkstra.txt', 'utf8', (err, data) => {
  if (err) throw err;
  if (currentFile === 'dijkstra.txt') {
    console.log(data);
  }
});
