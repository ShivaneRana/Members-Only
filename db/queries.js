const pool = require('./pool.js');
const bycryptjs = require('bcryptjs');

exports.addMember = async (obj) => {
    const { firstname, username, lastname, password } = obj;
    const hashedPassword = await bycryptjs.hash(password, 10);
    await pool.query(
        'INSERT INTO members (firstname,lastname,username,password) VALUES ($1,$2,$3,$4)',
        [firstname, lastname, username, hashedPassword]
    );
};

exports.fetchMember = async (id) => {
    const member = (await pool.query('SELECT * FROM members WHERE mid = $1', [id])).rows[0];
    return member;
};

exports.fetchPosts = async () => {
    try {
        const rows = (
            await pool.query(
                'SELECT m.username,m.is_member,m.is_admin,g.created_at,g.message_text FROM global_chat g JOIN members m ON g.mid = m.mid ORDER BY g.created_at;'
            )
        ).rows;
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    }
};

exports.addPosts = async (id, text) => {
    try {
        await pool.query('INSERT INTO global_chat (message_text,mid) VALUES ($1,$2)', [text, id]);
    } catch (err) {
        console.error(err);
    }
};
