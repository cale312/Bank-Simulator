const express = require('express');
const session = require('express-session');
var router = express.Router();

const userModel = require('../models/user.model');

router.get('/', (req, res) => {
    if (!req.session.username) {
        res.render('index', { title: 'Home'});
    } else {
        userModel
            .findOne({
                username: req.session.username
            })
            .then((user) => {
                if (user.role === 'user') {
                    res.redirect('/account/' + req.session.username);
                } else {
                    res.redirect('/bank');
                }
            })
    }
});

router.post('/', (req, res) => {
    
});

module.exports = router;
