import { app } from './app.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGOURI = `mongodb+srv://${process.env.MONGOSTRING}?retryWrites=true&w=majority`;

try {
    await mongoose.connect(MONGOURI, {
        useNewUrlParser: true
    });
    console.log("Connected to DB!!");
} catch (e) {
    console.log(e);
    throw e;
}

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

//app.listen(PORT, HOST);
app.listen(PORT);

console.log(`Running on http://${HOST}:${PORT}`);
