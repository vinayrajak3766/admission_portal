const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        requireed: true
    },
    email:{
        type: 'String',
        requireed: true
    },
    password:{
        type: String,
        requireed: true
    },
    confirm_password:{
        type: String,
        requireed: true
    },
    image:{
        public_id:{
            type: String
        },
        url:{
            type: String
        }
    },
    role:{
        type: String,
        default: 'user'
    }
})

//create collation

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel