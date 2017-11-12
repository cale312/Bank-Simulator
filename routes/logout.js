const express = require('express');
const session = require('express-session');
var router = express.Router();

const userModel = require('../models/user.model');

router.get('/', (req, res) => {
    userModel
        .findOneAndUpdate({
            username: req.session.username
        }, {
            loggedIn: false
        })
        .then( () => {
            delete req.session.username;
            delete req.session.role;
            res.redirect('/login');
        })
});

module.exports = router;
