const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const dbConfig = require('./configurations/dbConfig');

const mongoConnection = require('./mongoConnection');


const mountRoutes = require('./routes');


new mongoConnection(dbConfig);

const app = express();
app.use(bodyParser.json());
mountRoutes(app);

const server = http.createServer(app);
const port = 3000;

let startServer = server.listen(port, () => {
	console.log(`App server listening on port ${port}`)
})

