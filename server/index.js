const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const {initPassport} = require('./services/passport');
const {initChat} = require('./services/chat');
const routes = require('./routes');
const http = require('http');

mongoose
  .connect('mongodb://localhost:27017/ikka-db')
  // .connect('mongodb://igor:password1@ds259410.mlab.com:59410/ikka-db')
  .then(() => console.log('connection to the db made successfully!'))
  .catch(err => {
    console.error('failed to connect to mongodb', err);
  });

initPassport();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

const port = process.env.PORT || 3090;

const server = http.createServer(app).listen(port, () => {
  console.log(`ikka server started on port ${port}`);
});
const io = require('socket.io')(server, {path: '/ikkachat/socket.io'});

initChat(io);
