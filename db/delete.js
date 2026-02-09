#!/usr/bin/env node
const pool = require('./pool.js');

const deleteData = `
    DELETE FROM sessions;
    DELETE FROM global_chat;
    DELETE FROM members;
`;

const deleteTable = `
    DROP TABLE global_chat;
    DROP TABLE members;
    DROP TABLE sessions;

`;

const deleteInfo = async () => {
    console.log('Deleting tables...');
    try {
        await pool.query(deleteData);
        await pool.query(deleteTable);
        console.log('Data deleted.');
    } catch (err) {
        console.error(err);
    }
};

deleteInfo();
