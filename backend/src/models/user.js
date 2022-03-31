const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSquema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        unique: true,
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    select: {
        type: String,
        values: ['Admin', 'Superior', 'Usuario'],
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});
userSquema.index({'$**': 'text'});

userSquema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  userSquema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
  };

module.exports = mongoose.model('user', userSquema);