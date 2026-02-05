const db = require('../db/queries.js');

exports.renderPosts = async (req, res) => {
    const posts = await db.fetchPosts();
    return res.status(200).render('posts', { posts });
};

exports.createPosts = async (req, res) => {
    const post = req.body.post_text;
    const { mid } = req.user;
    await db.addPosts(mid, post);
    return res.status(200).redirect('/posts');
    // db.addPosts()
};
