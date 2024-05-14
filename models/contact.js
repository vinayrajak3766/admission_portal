const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    first_name:{
        type: 'string',
        requireed: true
    },
    last_name:{
        type: 'string',
        requireed: true
    },
    username:{
        type: 'string',
        requireed: true
    },
    email:{
        type: 'string',
        requireed: true
    },
    first_address:{
        type: 'string',
        requireed: true
    },
    second_address:{
        type: 'string',
        requireed: true
    },
    country:{
        type: 'string',
        requireed: true
    },
    state:{
        type: 'string',
        requireed: true
    },

})

//create collation

const ContactModel = mongoose.model('contact',ContactSchema)

module.exports = ContactModel