// import mongoose from "mongoose";

// // const MONGOURI = "mongodb+srv://jodi229:c4B8xhva@cluster0.zkfhtus.mongodb.net/martinezMoverflow?retryWrites=true&w=majority";
// const MONGOURI = `mongodb+srv://${process.env.MONGOSTRING}?retryWrites=true&w=majority`;

// console.log(MONGOURI);

// const InitiateMongoServer = async () => {
//   try {
//     await mongoose.connect(MONGOURI, {
//       useNewUrlParser: true
//     });
//     console.log("Connected to DB!!");
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// };

// // module.exports = InitiateMongoServer;
// export default InitiateMongoServer;
