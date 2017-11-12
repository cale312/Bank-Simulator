const express = require('express');
const session = require('express-session');
var router = express.Router();

const userModel = require('../models/user.model');
const userAccountModel = require('../models/user.account.model');

router.get('/:username', (req, res) => {
    const userName = req.params.username;
    userModel
        .findOne({
            username: userName
        })
        .then( (user) => {
            if (!user) {
                req.flash('error', 'invalid user');
                res.redirect('/login');
            } else if (user.role === 'admin') {
                res.redirect('/bank');
            } else if (user.account === false) {
                res.render('create_account', {title: 'Create Account'});
            } else {
                res.redirect('/account/' + userName);
            }
        })
});

router.post('/:username', (req, res) => {
    const userName = req.params.username;
    const accountName = req.body.accountName;
    const accountType = req.body.accountType;
    userAccountModel
        .findOne({
            accountName: accountName
        })
        .then( (account) => {
            if (!account) {
                userAccountModel
                    .create({
                        accountHolder: userName,
                        accountName: accountName,
                        accountType: accountType,
                        balance: 0
                    })
                    .then( () => {
                        userModel
                            .findOneAndUpdate({
                                username: userName
                            }, {
                                account: true
                            })
                            .then( () => {
                                res.redirect('/account/' + userName);
                            })
                    })
            } else {
                req.flash('error', 'account name already exists');
                res.redirect('/create_account/' + userName);
            }
        })
});

module.exports = router;
