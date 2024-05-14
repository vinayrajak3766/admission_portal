const jwt = require('jsonwebtoken')


const authRoles = (roles) => { //roles admin bala aur role user bala
    return (req,res,next) =>{
        // console.log(req.user.role)
        if (!roles.includes(req.userdata.role)){ //role db bala  
            req.flash('error','Unauthorised user please login')
            res.redirect('/')
        } 
        next();
    }

}
module.exports =authRoles