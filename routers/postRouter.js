const { Router } = require('express');
const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get('/', postController.renderPosts);
postRouter.post('/', postController.createPosts);
postRouter.get('/delete/:postId', postController.deletePosts);

module.exports = postRouter;
