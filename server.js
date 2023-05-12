// import { app } from './app.js';
// import mongoose from "mongoose";
// import dotenv from 'dotenv';
const { app } = require('./app.js');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const MONGOURI = `mongodb+srv://jodi229:c4B8xhva@cluster0.zkfhtus.mongodb.net/martinezMoverflow?retryWrites=true&w=majority`;

async function startApp () {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        });
        console.log("Connected to DB!!");
    } catch (e) {
        console.log(e);
        throw e;
    }
    const PORT = 8080;
    const HOST = 'localhost';
    
    //app.listen(PORT, HOST);
    app.listen(PORT);
    
    console.log(`Running on http://${HOST}:${PORT}`);
}

startApp();
