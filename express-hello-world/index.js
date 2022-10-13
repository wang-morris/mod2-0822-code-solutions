const express = require('express');
const app = express();

app.use((req, res) => {
  res.send('some string');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
