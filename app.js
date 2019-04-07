const express = require('express');
const http = require('http');
const app = express();

const mountRoutes = require('./routes');


//mountRoutes(app);

const server = http.createServer(app);
const port = 3000;

let startServer = server.listen(port, () => {
	console.log(`App server listening on port ${port}`)
})

