const mongoose = require('mongoose');

var Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
},
    {
        timeStamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;