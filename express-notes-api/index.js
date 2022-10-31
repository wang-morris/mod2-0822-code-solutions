const express = require('express');
const app = express();
const data = require('./data.json');
const notes = data.notes;
let counter = data.nextId;
const fs = require('fs');

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000!');
});

// clients can GET list of notes
app.get('/api/notes', (req, res) => {
  const array = Object.values(notes);
  res.json(array);
});

//  clients can GET note by id
app.get('/api/notes/:id', (req, res) => {
  if ((typeof req.param.is !== 'number') && (req.params.id < 0)) {
    res.status(400).json({ error: 'id must be a postitive integer' });
  } else if (notes[req.params.id]) {
    res.json(notes[req.params.id]);
  } else {
    res.status(404).json({ error: 'cannot find note with id ' + req.params.id });
  }
});

// clients can POST a new note
app.use(express.json());
app.post('/api/notes', (req, res) => {
  const id = counter;
  notes[id] = {};
  if (!req.body.content) {
    res.status(400).json({ error: 'content is a required field' });
  } else if (req.body.content) {
    notes[id].content = req.body.content;
    notes[id].id = counter;
    res.status(201).json(notes[id]);
    counter++;
    fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
      if (err) {
        res.status(500).json({ error: 'An unexpected error has occurred' });
      }
    });
  }
});

// clients can DELETE a note by id
app.delete('/api/notes/:id', (req, res) => {
  if ((typeof req.params.id !== 'number') && (req.params.id < 0)) {
    res.status(400).json({ error: 'id must be a postitive integer' });
  } else if (notes[req.params.id]) {
    delete (notes[req.params.id]);
    res.send(204);
    fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error has occurred' });
      }
    });
  } else if (!notes[req.params.id]) {
    res.status(404).json({ error: 'cannot find note with id ' + req.params.id });
  }
});

// clients can replace a note (PUT) by id
app.put('/api/notes/:id', (req, res) => {
  if ((typeof req.params.id !== 'number') && (req.params.id < 0)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (!req.body.content) {
    res.status(400).json({ error: 'content is a required field' });
  } else if (!notes[req.params.id]) {
    res.status(404).json({ error: 'cannot find note with id ' + req.params.id });
  } else if (notes[req.params.id]) {
    notes[req.params.id] = req.body;
    res.status(200).json(notes[req.params.id]);
    fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
      if (err) {
        res.status(500).json({ error: 'An unexpected error has occurred' });
      }
    });
  }
});
