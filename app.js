const express = require("express");
const path = require("node:path");
const bycrypt = require("bcryptjs");
const dotenv = require("dotenv").config({ quiet: true, debug: false });

// Routers
const indexRouter = require("./routers/indexRouter.js");


const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/", indexRouter);

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("http://localhost:3000");
});
