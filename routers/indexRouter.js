const { Router } = require('express');
const indexController = require('../controllers/indexController.js');
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

indexRouter.post('/member', indexController.makeMember);

indexRouter.get('/admin', (req, res) => {
    res.status(200).render('admin');
});

module.exports = indexRouter;
