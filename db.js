
const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://jodi229:c4B8xhva@cluster0.zkfhtus.mongodb.net/martinezMoverflow?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB!!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
