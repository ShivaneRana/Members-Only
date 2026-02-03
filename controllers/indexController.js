const path = require('node:path');
const db = require('../db/queries.js');
const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
    quiet: true,
    debug: false,
});

const { body, validationResult } = require('express-validator');

const validationObject_member = [
    body('membership_code')
        .trim()
        .notEmpty()
        .withMessage('Cannot be empty')
        .custom((value) => {
            if (value === process.env.SECRET_CODE_MEMBERSHIP) {
                return true;
            } else {
                throw new Error('Wrong code');
            }
        }),
];

const validationObject_admin = [
    body('admin_code')
        .trim()
        .notEmpty()
        .withMessage('Cannot be empty')
        .custom((value) => {
            if (value === process.env.SECRET_CODE_ADMIN) {
                return true;
            } else {
                throw new Error('Wrong code');
            }
        }),
]

exports.makeMember = [
    validationObject_member,
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).render('member', { errors: errors.array() });
        }

        db.enableMembership(req.user.mid);
        return res.status(200).redirect('/member');
    },
];

exports.makeAdmin = [
    validationObject_admin,
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).render('admin', { errors: errors.array() });
        }

        db.enableAdmin(req.user.mid);
        return res.status(200).redirect('/admin');
    },
];
