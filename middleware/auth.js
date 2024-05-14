const jwt = require('jsonwebtoken');
const UserModel= require('../models/user');


const checkAuth = async(req, res, next) => {
    //console.log("hello auth")

    //token get
    const {token}= req.cookies
    //console.log(token)
    if (!token){
        req.flash('error',"Unauthorized user please Login")
        res.redirect('/')
    }else{
        const verifylogin = jwt.verify(token,'tokencreation@123')
        //console.log(verifylogin) // get id
        const data = await UserModel.findOne({_id:verifylogin.ID})
        //console.log(data)
        req.userdata = data
        next()
    }
}
module.exports = checkAuth