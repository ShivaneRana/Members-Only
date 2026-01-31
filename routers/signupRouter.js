const { Router } = require('express');
const signupController = require('../controllers/signupController.js');

const signupRouter = Router();

signupRouter.get('/', (req, res) => {
    res.status(200).render('sign-up');
});

signupRouter.post('/', signupController.postAddUser);

module.exports = signupRouter;
