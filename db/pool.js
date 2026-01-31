#!/usr/bin/env node
const { Pool } = require('pg');
const path = require('node:path');
const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
    quiet: true,
    debug: false,
});

const pool = new Pool({
    connectionString: process.env.DATABASE_STRING_DEV,
});

module.exports = pool;
