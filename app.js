const express = require("express");
const path = require("node:path");
const dotenv = require("dotenv").config({quiet:true,debug:false});

const app = express();

app.get("/",(req,res) => {
    res.status(200).send("Hello I am here");
})

app.listen(3000,(err) => {
    if(err){
        console.error(err)
    }
    console.log("http://localhost:3000");
})