const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { mongoose } = require('./database');
const app = express();

//settings
app.set('port', process.env.PORT || 4000)
//middlewares
app.use(morgan('dev'));
app.use(express.json())
//routes
app.use('/api/establishment', require('./routes/operation.routes'))
//static files
app.use(express.static(path.join(__dirname, 'public')))
//starting the server
const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})

module.exports = {app, server};