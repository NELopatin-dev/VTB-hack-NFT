const mongoose = require('mongoose');
const { Schema, model, Types } = require("mongoose");

const WalletSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    publicKey: {
        type: String, 
        required: true
    },
    privatKey: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Wallet', WalletSchema)