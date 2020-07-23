const express = require('express');

const { renderHttp } = require('./index');

const app = express();

app.get('/google-charts', renderHttp);

const port = process.env.PORT || 3500;
app.listen(port);
console.log(`Listening on port ${port}`);
