import http from 'http';
import {env} from './env.js';
import { logger } from './logger.js';
import {error} from 'console';
import { createApp } from './app/index.js';

async function main(){
    try {
        const PORT: number = +(env.PORT ?? 8000); // +() is done for typecasting string to number as process.env.PORT gives string
        const server = http.createServer(createApp());
        server.listen(PORT, () => {
            logger.info(`Server is running on PORT ${PORT}`);
        });
    } catch (err) {
        logger.error(`Error starting server`, err);
    }
}

main();