#!/usr/bin/env node

const {Pool} = require("pg");
const path = require('node:path');
const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
    quiet: true,
    debug: false,
});

let CONNECTION_STRING;

if (argv[2] === 'dev') {
    console.log('Development database choosen');
    DATABASE_STRING = process.env.DATABASE_STRING_DEV;
} else if (argv[2] === 'prod') {
    console.log('Production database choosen');
    DATABASE_STRING = process.env.DATABASE_STRING_PROD;
};

const pool = new Pool({
    connectionString: CONNECTION_STRING
});

module.exportst = pool;