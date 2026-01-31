const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries.js');

//todo add check for preexisting user and deny adding username that already exists.

const validationObject = [
    body('firstname')
        .trim()
        .notEmpty()
        .withMessage('Firstname cannot be empty')
        .isAlpha()
        .withMessage('Firstname can only contain alphabets'),

    body('lastname')
        .trim()
        .notEmpty()
        .withMessage('Lastname cannot be empty')
        .isAlpha()
        .withMessage('Lastname can only contain alphabets'),

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

    body('confirm_password')
        .trim()
        .notEmpty()
        .withMessage('Confirm password cannot be empty')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
];

exports.renderSignupPage = (req,res) => {
    return res.status(200).render('sign-up');
}

exports.postSignupUser = [
    validationObject,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).render('sign-up', { errors: errors.array() });
        }

        const { firstname, lastname, username, password } = matchedData(req);
        db.addMember({ firstname, lastname, username, password });
        return res.status(200).render('index');
    },
];
