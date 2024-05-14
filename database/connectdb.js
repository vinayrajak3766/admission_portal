const mongoose = require('mongoose');

const localurl ='mongodb://127.0.0.1:27017/admission_portl'
const liveurl = 'mongodb+srv://vinayrajak3766:Vinay123@cluster0.xoyvqh3.mongodb.net/admissionportal?retryWrites=true&w=majority&appName=Cluster0'

const connectdb = ()=>{
    return mongoose.connect(liveurl)
    .then((result) => {
        console.log('database connection working');
    }).catch((err) => {
        console.log(err)
    });
}

module.exports =connectdb