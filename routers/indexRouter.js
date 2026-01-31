const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.status(200).render('index');
});

indexRouter.get('/home', (req, res) => {
    res.status(200).render('index');
});

indexRouter.get('/member', (req, res) => {
    res.status(200).render('member');
});

indexRouter.get('/admin', (req, res) => {
    res.status(200).render('admin');
});

module.exports = indexRouter;
