require("dotenv").config();

import micro from "micro";
import env from "./env";
import { selectApp } from "./app-selector";
import logger from "./logger";


const server = micro(async (req, res) => {
  try {
    const app = selectApp(req);
    await app.route(req, res);
  } catch (e) {
    logger.error(e);
    res.statusCode = 500;
    res.write("500");
    res.end();
  }
});

server.listen(env.PORT);

console.log(`Listening on port ${env.PORT}...`);
