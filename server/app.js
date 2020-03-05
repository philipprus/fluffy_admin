const express = require('express');
const path = require('path');
const routers = require('./routers');
const formData = require('express-form-data');
const cors = require('cors');
// const expressWinston = require('express-winston');
// const { createExpressWinstonOptions } =  require('./utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
app.use(cors()); 
app.use(formData.parse());


app.use(express.static(path.join(__dirname, 'build')));


routers.forEach(o => app.use(`/api${o.prefix}`, o.router));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use(expressWinston.errorLogger(createExpressWinstonOptions()));


module.exports = app; 