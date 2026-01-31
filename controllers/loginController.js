const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries');

const validationObject = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username cannot be empty')
        .isLength({ max: 64 })
        .withMessage('Username cannot have more than 64 characters')
        .matches(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
        .withMessage('Username can contain only letters, numbers, and special characters'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password should be between 8 and 64 characters')
        .matches(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
        .withMessage('Password can contain only letters, numbers, and special characters'),
];

exports.renderLoginPage = (req, res) => {
    res.status(200).render('log-in');
};

exports.postLoginUser = [
    validationObject,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).render('log-in', { errors: errors.array() });
        }
        return res.status(200).render('posts');
    },
];
