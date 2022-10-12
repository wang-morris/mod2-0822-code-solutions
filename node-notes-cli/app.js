const fs = require('fs');
const command = process.argv[2];
const string = process.argv[3];
const updatedString = process.argv[4];
const JSONdata = require('./data.json');
const dataArray = JSONdata.notes;

if (command === 'read') {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
  });
  for (const [key, value] of Object.entries(dataArray)) {
    console.log(key + ': ' + value);
  }
} else if (command === 'create') {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    json.nextId++;
    const array = Object.entries(json.notes);
    array.push([json.nextId, string]);
    json.notes = Object.fromEntries(array);
    fs.writeFile('./data.json', JSON.stringify(json, null, 2), err => {
      if (err) throw err;
    });
  });
} else if (command === 'update') {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    const array = Object.entries(json.notes);
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === string) {
        array.splice(i, 1, [string, updatedString]);
        json.notes = Object.fromEntries(array);
        fs.writeFile('./data.json', JSON.stringify(json, null, 2), err => {
          if (err) throw err;
        });
      }
    }
  });
} else if (command === 'delete') {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    const array = Object.entries(json.notes);
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === string) {
        array.splice(i, 1);
        json.notes = Object.fromEntries(array);
        fs.writeFile('./data.json', JSON.stringify(json, null, 2), err => {
          if (err) throw err;
        });
      }
    }
  });
}
