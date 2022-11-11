const express = require('express');
const pg = require('pg');
const app = express();
app.use(express.json());

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000!');
});

// GET request to return all rows from the "grades" table
app.get('/api/grades', (req, res, next) => {
  const sql = `
    select *
      from "grades";
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

// POST request to insert a new grade into the "grades" table
app.post('/api/grades', (req, res, next) => {
  const sql = `
    insert into "grades" ("name", "course", "score")
    values($1, $2, $3)
    returning *;
  `;
  const values = [req.body.name, req.body.course, req.body.score];
  // checks if required fields are completed and are valid entries
  if (!req.body.name || !req.body.course || !req.body.score) {
    res.status(400).json({ error: 'missing required name, course, or grade field' });
  } else if (typeof values[0] !== 'string' || typeof values[1] !== 'string') {
    res.status(400).json({ error: 'the name and course must be a valid alphabetical characters' });
  } else if (typeof values[2] !== 'number') {
    res.status(400).json({ error: 'the grade must be a positive number' });
  } else if (values[2] > 100 || values[2] < 0) {
    res.status(400).json({ error: 'the grade must be a number from 0 to 100' });
  } else {
    // queries db and updates table; error message if query fails
    db.query(sql, values)
      .then(result => {
        res.status(201).json(result.rows[0]);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  }
});

// PUT request to update a grade in the table by gradeId
app.put('/api/grades/:gradeId', (req, res, next) => {
  const grade = Number(req.body.score);
  const gradeId = Number(req.params.gradeId);
  const sql = `
    update "grades"
        set "score" = $1
      where "gradeId" = $2
      returning *;
  `;
  const params = [grade, gradeId];
  // checks if required fields are completed and are valid entries
  if (!req.body.score || !req.params.gradeId) {
    res.status(400).json({ error: 'the grade and gradeId are required fields' });
  } else if (typeof params[0] !== 'number' || typeof params[1] !== 'number') {
    res.status(400).json({ error: 'the grade and gradeId must be numberic values' });
  } else if (params[1] < 0) {
    res.status(400).json({ error: 'the gradeId must be a positive number' });
  } else if (params[0] > 100 || params[0] < 0) {
    res.status(400).json({ error: 'the grade must be a number between 0 and 100' });
    // queries db and returns updated grade row; Checks if grade does not exist in db and sends error message if query fails
  } else {
    db.query(sql, params)
      .then(result => {
        if (!result.rows.length) {
          res.status(404).json({ error: 'grade may not exist in database' });
        } else {
          res.status(200).json(result.rows[0]);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: 'An unexpected error occurred'
        });
      });
  }
});

// DELETE request that deletes a grade from the "grades" by gradeId
app.delete('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  const sql = `
    delete
      from "grades"
     where "gradeId" = $1
     returning *;
  `;
  const params = [gradeId];
  // checks if required fields are completed and are valid entries
  if (!req.params.gradeId) {
    res.status(400).json({ error: 'A gradeId must be specified' });
  } else if (typeof gradeId !== 'number' || gradeId < 0) {
    res.status(400).json({ error: 'the gradeId must be a positive number' });
  }
  // queries db and returns 204 if grade successfully deleted; Checks if grade does not exist in db and sends error message if query fails
  db.query(sql, params)
    .then(result => {
      if (!result.rows.length) {
        res.status(404).json({ error: 'grade may not be in database' });
      } else {
        res.status(204).send();
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});
