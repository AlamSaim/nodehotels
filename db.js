const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURL = process.env.MONGODB_URL_LOCAL; //replace hotels with any db name
const mongoURL = process.env.MONGODB_URL;

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
