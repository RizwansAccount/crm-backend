import express from 'express';
import loaders from './src/loaders/index.js';
import config from './src/config/index.js';
import dotenv from "dotenv";

async function startServer() {

  dotenv.config();

  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(config.env.port, () => {
    console.log(`Server Started ~ :${config.env.port}`);
  });

}

startServer();