const express = require('express');
const session = require('express-session');
var router = express.Router();

const userAccountModel = require('../models/user.account.model');
const userModel = require('../models/user.model');

router.get('/', (req, res) => {
    const userName = req.session.username;
    userAccountModel
        .findOneAndRemove({
            accountHolder: userName
        })
        .then( () => {
            userModel
                .findOneAndUpdate({
                    username: userName
                }, {
                    account: false
                })
                .then( () => {
                    res.redirect('/create_account/' + userName);
                })
        })
});

module.exports = router;
