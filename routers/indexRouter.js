const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.status(200).render("index");
});

indexRouter.get("/home", (req, res) => {
    res.status(200).render("home");
});


indexRouter.get("/sign-up", (req, res) => {
    res.status(200).render("sign-up");
});

indexRouter.get("/log-in", (req, res) => {
    res.status(200).render("log-in");
});


module.exports = indexRouter;
