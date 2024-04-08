const mongoose = require("mongoose");

//define the MongoDB connection URL
const mongoURL = process.env.MONGO_URL;

//setup MongoDb connection
mongoose.connect(mongoURL);

//Get the default connection
const db = mongoose.connection;

//define event listeners
db.on("connected", () => {
  console.log("Connected to MongoDB server....");
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected....");
});

//export the db connection
module.exports = db;
