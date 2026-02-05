const { Router } = require('express');
const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get('/', postController.renderPosts);
postRouter.post('/',postController.createPosts);

module.exports = postRouter;
