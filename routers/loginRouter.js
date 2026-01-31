const { Router } = require('express');
const loginController = require('../controllers/loginController.js');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLoginPage);
loginRouter.post('/', loginController.postLoginUser);


module.exports = loginRouter;
