const express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/', (req, res) => {
    (!req.session.username) ? res.render('index', { title: 'Home' }) : res.redirect('/account/' + req.session.username);
});

router.post('/', (req, res) => {
    
});

module.exports = router;
