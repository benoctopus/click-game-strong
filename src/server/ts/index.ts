const express = require('express');
const parser = require('body-parser');
const logger = require('morgan');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(logger());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(parser.text());

app.use('/', express.static(path.join(__dirname, '../../../dist')));

app.listen(PORT, () => console.log('listening on', PORT));
