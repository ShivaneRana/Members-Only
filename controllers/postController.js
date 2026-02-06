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
};

exports.deletePosts = async (req, res) => {
    if (!req.user) {
        return res.status(200).redirect('/log-in');
    }

    if (!req.user.is_admin) {
        return res.status(200).redirect('/admin');
    }

    const { postId } = req.params;
    await db.removePost(postId);
    return res.status(200).redirect('/posts');
};
