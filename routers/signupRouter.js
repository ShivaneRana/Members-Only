const { Router } = require('express');
const signupController = require('../controllers/signupController.js');

const signupRouter = Router();

signupRouter.get('/', signupController.renderSignupPage);
signupRouter.post('/', signupController.postAddUser);

module.exports = signupRouter;
