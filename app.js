const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const mountRoutes = require('./routes');

const app = express();
//app.use(require('morgan')('dev'));
////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mountRoutes(app);

const server = http.createServer(app);
const port = 3000;

let startServer = server.listen(port, () => {
	console.log(`App server listening on port ${port}`)
})

