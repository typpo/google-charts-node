const express = require('express');

const { render } = require('./index');

const app = express();

app.get('/google-charts', render);

const port = process.env.PORT || 3500;
app.listen(port);
console.log(`Listening on port ${port}`);
