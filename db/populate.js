#!/usr/bin/env node
const {Client} = require("pg");
const {argv} = require("node:process");
const path = require("node:path");
const dotenv = require("dotenv").config({path: path.resolve(__dirname,"../.env"),quiet:true,debug:false});

let DATABASE_STRING;

let createTable = `
    CREATE TABLE members(
        mid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name TEXT NOT NULL,
        last_name TEXT DEFAULT '',
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        is_member BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE global_chat(
        tid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        message_text TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        mid INT REFERENCES members(mid)
    )
`;

if(argv[2] === "dev"){
    console.log("Development database choosen");
    DATABASE_STRING = process.env.DATABASE_STRING_DEV;
}else if(argv[2] === "prod"){
    console.log("Production database choosen");
    DATABASE_STRING = process.env.DATABASE_STRING_PROD;
};

async function main(){
    const client = new Client({
        connectionString: DATABASE_STRING
    })

    console.log(DATABASE_STRING);
    console.log("connecting to database.");

    try{
        console.log("running query.....")
        await client.connect();
        await client.query(createUser);
    }catch(err){
        console.error(err);
    }finally{
        console.log("connection ended.");
        await client.end();
    }
}

main()