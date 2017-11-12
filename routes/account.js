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
                req.flash('error', 'invalid username/password');
                res.redirect('/login');
            } else if (user.loggedIn === false) {
                res.send('Access denied...')
            } else if (user.account === true) {
                userAccountModel
                    .findOne({
                        accountHolder: userName
                    })
                    .then( (account) => {
                        res.render('account', {
                            accountName: account.accountName,
                            balance: account.balance,
                            accountType: account.accountType,
                            title: 'Account : ' + userName
                        });
                    })
            } else {
                res.redirect('/create_account/' + userName);
            }
        })
});

router.post('/:username', (req, res) => {
    const userName = req.params.username;
    const deposit_amount = req.body.depositAmount;
    userAccountModel
        .findOneAndUpdate({
            accountHolder: userName
        }, {
            $inc: {
                balance: deposit_amount
            }
        })
        .then( (result) => {
            res.redirect('/create_account/' + userName);
        })
});

module.exports = router;
