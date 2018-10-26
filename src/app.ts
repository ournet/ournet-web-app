
require('dotenv').config();

import micro from 'micro';
import env from './env';
import { selectApp } from './app-selector';

const server = micro(async (req, res) => {
    try {
        const app = selectApp(req);
        await app.route(req, res);
    } catch (e) {
        res.statusCode = 500;
        res.write(JSON.stringify(e));
        res.end();
    }
});

server.listen(env.PORT);

console.log(`Listening on port ${env.PORT}...`)
