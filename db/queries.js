const pool = require("./pool.js");
const bycryptjs = require("bcryptjs");

exports.addMember = async(obj) => {
    const {firstname,username,lastname,password} = obj;
    const hashedPassword = await bycryptjs.hash(password,10);
    await pool.query("INSERT INTO members (firstname,lastname,username,password) VALUES ($1,$2,$3,$4)",[firstname,lastname,username,hashedPassword])
}