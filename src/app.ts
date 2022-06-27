import express from 'express';
import dotenv from 'dotenv';
import loaders from './loaders';
import {createServer} from "http";

dotenv.config({ path: '../.env' });

async function startServer() {
    const app = express();
    const server = createServer(app);

    await loaders({ expressApp: app });

    server.listen(process.env.PORT, () => {
        console.log(`server is listening ${process.env.NODE_ENV} on ${process.env.PORT}`);
    });

    server.setTimeout(3600 * 1000);
}

startServer();