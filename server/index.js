const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const {initPassport} = require('./services/passport');
const routes = require('./routes');

mongoose.connect('mongodb://igor:password1@ds259410.mlab.com:59410/ikka-db');
//mongoose.connect('mongodb://localhost:27017/ikka-db');
initPassport();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

const port = process.env.PORT || 3090;
app.listen(port, () => {
    console.log(`ikka server started on port ${port}`);
});
