const { Router } = require('express');
const loginController = require("../controllers/loginController.js");

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.status(200).render('index');
});

indexRouter.get('/home', (req, res) => {
    res.status(200).render('index');
});

indexRouter.get('/post{s}', (req, res) => {
    res.status(200).render('posts');
});

indexRouter.get('/log-in', (req, res) => {
    res.status(200).render('log-in');
});

indexRouter.get('/member', (req, res) => {
    res.status(200).render('member');
});

indexRouter.get('/admin', (req, res) => {
    res.status(200).render('admin');
});

module.exports = indexRouter;
