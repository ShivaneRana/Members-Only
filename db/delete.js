#!/usr/bin/env node
const pool = require('./pool.js');

const deleteData = `
    DELETE FROM members;
    DELETE FROM global_chat;
    DELETE FROM sessions;
`;

const deleteTable = `

    DROP TABLE global_chat;
    DROP TABLE members;
    DROP TABLE member_sessions;
    DROP TABLE sessions;

`;

const deleteInfo = async () => {
    console.log('Deleting tables...');
    try {
        await pool.query(deleteData);
        await pool.query(deleteTable);
        console.log('Data deleted.');
    } catch (err) {
        console.log(1111);
        console.error(err);
    }
};

deleteInfo();
