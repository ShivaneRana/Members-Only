const express = require('express');
const path = require('node:path');
const pool = require('./db/pool.js');
const passport = require('passport');
const session = require('express-session');
const psqlStore = require('connect-pg-simple')(session);
const dotenv = require('dotenv').config({ quiet: true, debug: false });

// Routers
const indexRouter = require('./routers/indexRouter.js');
const signupRouter = require('./routers/signupRouter.js');
const loginRouter = require('./routers/loginRouter.js');
const postRouter = require('./routers/postRouter.js');
const { configurePassport } = require('./middlewares/passport.js');
const isAuth = require('./middlewares/isAuth.js');

const SESSION_STORE = process.env.SESSION_STORE;
const sessionStore = new psqlStore({
    pool: pool,
    tableName: 'sessions',
    pruneSessionInterval: 23 * 60 * 60,
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        store: sessionStore,
        secret: SESSION_STORE,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    })
);

configurePassport(passport, pool);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRouter);

app.use('/sign-up', signupRouter);

app.post(
    '/log-in',
    passport.authenticate('local', {
        successRedirect: '/posts',
        failureRedirect: '/',
    })
);

app.use('/log-in', loginRouter);
app.use('/posts', postRouter);

app.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy((err) => {
            if (err) return next(err);

            res.clearCookie('connect.sid');
            return res.redirect('/');
        });
    });
});

app.use((req, res) => {
    return res.status(404).render('404');
});

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).render('error');
});

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    }
    console.log('http://localhost:3000');
});
