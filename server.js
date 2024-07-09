const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //convert all data in json object and and we'll get data from req.body
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("welcome ");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

//comment added
//this is another comment for checking git purpose
