const db = require('../db/queries.js');

exports.renderPosts = async (req, res) => {
    const posts = await db.fetchPosts();
    res.status(200).render('posts',{posts});
};
