const express = require('express');
const session = require('express-session');
var router = express.Router();

const userModel = require('../models/user.model');
const userAccountModel = require('../models/user.account.model');

router.get('/', (req, res) => {
    userModel
        .findOne({
            username: req.session.username
        })
        .then( (user) => {
            if (user.role === 'admin') {
                userAccountModel
                    .find({})
                    .then((accounts) => {
                        res.render('bank', { title: 'Admin', accounts: accounts });
                    })
            } else {
                res.send('Access denied...');
            }
        })
});

module.exports = router;
