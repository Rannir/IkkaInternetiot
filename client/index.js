const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('builds/development'))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`ikka client started on port ${port}`);
});
