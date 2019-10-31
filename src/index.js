require('dotenv').config({ path: '.env' });

const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(process.env.PORT, function () {
    console.log('App listening on port ' + process.env.PORT + '!');
    console.log('INFO: Server is running in ' + process.env.NODE_ENV + ' mode!');
});
