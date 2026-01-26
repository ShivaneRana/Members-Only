const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.status(200).render("index");
});

indexRouter.get("/home", (req, res) => {
    res.status(200).render("home");
});


module.exports = indexRouter;
