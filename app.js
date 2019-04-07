const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const dbConfig = require('./configurations/dbConfig');

const mongo = require('./mongo');
const mountRoutes = require('./routes');


mongo.connect(dbConfig.MONGO);

const app = express();
app.use(bodyParser.json());
mountRoutes(app);

const server = http.createServer(app);
const port = 3000;

let startServer = server.listen(port, () => {
	console.log(`App server listening on port ${port}`)
})

