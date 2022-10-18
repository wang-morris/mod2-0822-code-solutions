const express = require('express');
const app = express();
let nextId = 1;

const grades = {

};

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000!');
});

app.get('/api/grades', (req, res) => {
  const array = Object.values(grades);
  res.json(array);
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  const id = nextId;
  grades[id] = {};
  grades[id].name = req.body.name;
  grades[id].course = req.body.course;
  grades[id].grade = req.body.grade;
  grades[id].id = nextId;
  res.sendStatus(201);
  nextId++;
});
