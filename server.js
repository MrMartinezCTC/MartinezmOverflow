import { app } from './app.js';
import InitiateMongoServer from './db.js';
import dotenv from 'dotenv';


dotenv.config();

InitiateMongoServer();

const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
