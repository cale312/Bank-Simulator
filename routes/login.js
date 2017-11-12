const express = require('express');
const session = require('express-session');
var router = express.Router();

const userModel = require('../models/user.model');

router.get('/', (req, res) => {
    const userName = req.session.username;
    if (!userName) {
        res.render('login', { title: 'Login' });
    } else {
        userModel
            .findOne({
                username: userName
            })
            .then((user) => {
                if (user.loggedIn === true) {
                    res.redirect('/account/' + userName);
                } else {
                    res.render('login', { title: 'Login' });
                }
            })
    }
});

router.post('/', (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    userModel
        .findOne({
            username: userName,
            password: password
        })
        .then( (user) => {
            if (!user) {
                req.flash('error', 'invalid username/pasword');
                res.redirect('/login');
            } else if (user.role !== 'admin') {
                req.session.username = userName;
                userModel
                    .findOneAndUpdate({
                        username: req.session.username
                    }, {
                        loggedIn: true
                    })
                    .then( () => {
                        res.redirect('/account/' + userName);
                    })
            } else if (user.role === 'admin') {
                req.session.username = userName;
                res.redirect('/bank');
            }
        })
});

module.exports = router;
