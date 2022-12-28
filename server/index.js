// starting the server
// const server = require('./src/server')
import server from './src/server.js';
import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env.PORT, 'this is the port for now');

// server port
const port = process.env.PORT || 5000;

// starting the server

const startServer = () => {
  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
