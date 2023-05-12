import { app } from './app.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGOURI = `mongodb+srv://jodi229:c4B8xhva@cluster0.zkfhtus.mongodb.net/martinezMoverflow?retryWrites=true&w=majority`;

try {
    await mongoose.connect(MONGOURI, {
        useNewUrlParser: true
    });
    console.log("Connected to DB!!");
} catch (e) {
    console.log(e);
    throw e;
}

const PORT = 3000;
const HOST = 'localhost';

//app.listen(PORT, HOST);
app.listen(PORT);

console.log(`Running on http://${HOST}:${PORT}`);
