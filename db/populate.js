#!/usr/bin/env node
const { Client } = require('pg');
const { argv } = require('node:process');
const path = require('node:path');
const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
    quiet: true,
    debug: false,
});

let DATABASE_STRING;

let createTable = `
    CREATE TABLE IF NOT  EXISTS members(
        mid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname TEXT NOT NULL,
        lastname TEXT DEFAULT '',
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_member BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT  EXISTS global_chat(
        tid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        message_text TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        mid INT REFERENCES members(mid)
    )
`;

let insertData = `
    INSERT INTO members (firstname, lastname, username, password, is_member, is_admin)
    VALUES
    ('Alice',   'Smith',   'alice',   'password1', TRUE,  FALSE),
    ('Bob',     'Jones',   'bob',     'password2', TRUE,  FALSE),
    ('Charlie', 'Brown',   'charlie', 'password3', TRUE,  FALSE),
    ('Diana',   'Prince',  'diana',   'password4', TRUE,  TRUE),
    ('Eve',     'Taylor',  'eve',     'password5', FALSE, FALSE),
    ('Frank',   'Miller',  'frank',   'password6', TRUE,  FALSE);

    INSERT INTO global_chat(message_text,created_at,mid) VALUES('example number 1','2026-11-23',1);
    INSERT INTO global_chat(message_text,created_at,mid) VALUES('example number 1','2026-11-23',2);
    INSERT INTO global_chat(message_text,created_at,mid) VALUES('example number 1','2026-11-23',3);
    INSERT INTO global_chat(message_text,created_at,mid) VALUES('example number 1','2026-11-23',4);
    INSERT INTO global_chat(message_text,created_at,mid) VALUES('example number 1','2026-11-23',5);
    INSERT INTO global_chat(message_text,created_at,mid) VALUES('example number 1','2026-11-23',6);
`;

if (argv[2] === 'dev') {
    console.log('Development database choosen');
    DATABASE_STRING = process.env.DATABASE_STRING_DEV;
} else if (argv[2] === 'prod') {
    console.log('Production database choosen');
    DATABASE_STRING = process.env.DATABASE_STRING_PROD;
}

async function main() {
    const client = new Client({
        connectionString: DATABASE_STRING,
    });

    console.log(DATABASE_STRING);
    console.log('connecting to database.');

    try {
        console.log('running query.....');
        await client.connect();
        await client.query(createTable);
        await client.query(insertData);
    } catch (err) {
        console.error(err);
    } finally {
        console.log('connection ended.');
        await client.end();
    }
}

main();
