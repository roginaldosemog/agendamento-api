const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || '8080';

app.use(express.json());
app.use(routes);

app.listen(port);