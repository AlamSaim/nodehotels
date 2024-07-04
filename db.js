const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //replace hotels with any db name

mongoose.connect(mongoURL, {});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongodb server");
});

db.on("disconnected", () => {
  console.log("disconnected from mongodb server");
});

db.on("error", (err) => {
  console.error("connection error", err);
});

//export the database connection
module.exports = db;
