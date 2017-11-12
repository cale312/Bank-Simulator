const express = require('express');
const session = require('express-session');
var router = express.Router();

const userModel = require('../models/user.model');

router.get('/', (req, res) => {
    if (!req.session.username) {
        res.render('register', { title: 'Register' });
    } else {
        res.redirect('/account/' + req.session.username);
    }
});

router.post('/', (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const userName = req.body.username;
    const password = req.body.password;
    const Email = req.body.email;
    const cellNumber = req.body.cellnumber;

    userModel
        .findOne({
            username: userName
        })
        .then( (user) => {
            if (!user) {
                userModel
                    .create({
                        firstName: firstName,
                        lastName: lastName,
                        username: userName,
                        password: password,
                        email: Email,
                        cellNumber: cellNumber,
                        loggedIn: true,
                        account: false,
                        role: 'user'
                    })
                req.session.username = userName;
                req.session.role = 'User';
                res.redirect('/create_account/' + userName);
            } else if (user.email === Email) {
                req.flash('error', 'email already exist');
                res.redirect('/register');
            } else if (user.username === userName) {
                req.flash('error', 'username already exist');
                res.redirect('/register');
            }
        })

});

module.exports = router;