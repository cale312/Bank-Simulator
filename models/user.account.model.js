const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    accountHolder: String,
    accountName: String,
    accountType: String,
    balance: Number
});

var account = mongoose.model('accounts', accountSchema);

module.exports = account;