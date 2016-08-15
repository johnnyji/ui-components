const app = require('express')();

app.get('*', function(_, res) {
  res.sendFile(require('./index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening on http://localhost:3000');
});
