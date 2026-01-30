const db = require('../db/queries.js');

exports.logStuff = (req,res) => {
    console.log(req.body);
    db.addMember(req.body);
    res.status(200).redirect('/sign-up');
}