const { Router } = require('express');

const loginRouter = Router();

loginRouter.use('/', (req, res) => {
    res.status(200).render('log-in');
});

module.exports = loginRouter;
