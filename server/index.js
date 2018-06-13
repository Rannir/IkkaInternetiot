const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
//logging framework
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://igor:password1@ds259410.mlab.com:59410/ikka-db');

// App Setup
app.use(morgan('combined'));
app.use(cors());
// parse request to json no matter what request type is
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);