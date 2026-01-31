const { Router } = require('express');
const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get('/', postController.renderPosts);

module.exports = postRouter;
