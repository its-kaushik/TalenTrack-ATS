const http = require('http');
require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const server = http.createServer(app);
const PORT = process.env.PORT || process.env.DEV_PORT;

async function createServer() {
  mongoConnect();

  server.listen(PORT, () => {
    console.log('The server is up and running on PORT :', PORT);
  });
}

createServer();
