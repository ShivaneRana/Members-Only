const db = require('../db/queries.js');
const {body,validationResult} = require('express-validator');

const validationObject = [
    body('post_text')
        .trim()
        .notEmpty()
        .withMessage('Post cannot be empty')
        .isLength({ max: 280 })
        .withMessage('Character limit of 280 exceeded')
]

exports.renderPosts = async (req, res) => {
    const posts = await db.fetchPosts();
    return res.status(200).render('posts', { posts });
};

exports.createPosts = [
    validationObject,
    async (req,res) => {
        const posts = await db.fetchPosts();
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).render('posts',{posts,errors: errors.array()})
        }
        const post = req.body.post_text;
        const { mid } = req.user;
        await db.addPosts(mid, post);
        return res.status(200).redirect('/posts');
    }
]

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
