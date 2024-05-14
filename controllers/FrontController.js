
var jwt = require('jsonwebtoken');
const UserModel = require('../models/user')
const ContactModel = require('../models/contact');
const bcrypt = require('bcrypt');
const CourseModel = require('../models/course');

const cloudinary = require('cloudinary').v2;
//for upload files from cloudinary server
cloudinary.config({
    cloud_name: 'dhfhzbsjz',
    api_key: '162315467224365',
    api_secret: 'Pv_ghoggnwH6QcosbcMJyAwDpIE'
});
class FrontController {
    static home = async (req, res) => {
        try {
            // res.send("home page") 
            const { name, image, email, id } = req.userdata
            const btech = await CourseModel.findOne({ user_id: id, course: "btech" });
            const bca = await CourseModel.findOne({ user_id: id, course: "bca" });
            const mca = await CourseModel.findOne({ user_id: id, course: "mca" });
            res.render('home', { name: name, image: image, email: email, btech: btech, bca: bca, mca: mca })
        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {

            // res.send("about page")
            const { name, image, email } = req.userdata
            res.render('about', { name: name, image: image, email: email })
        } catch (error) {
            console.log(error)
        }
    }

    static contact = async (req, res) => {
        try {
            // res.send("contact page")
            const { name, image, email } = req.userdata
            res.render('contact', { name: name, image: image, email: email })
        } catch (error) {
            console.log(error)
        }
    }

    static team = async (req, res) => {
        try {
            // res.send("team page")
            const { name, image, email } = req.userdata
            res.render('team', { name: name, image: image, email: email })
        } catch (error) {
            console.log(error)
        }
    }

    static login = async (req, res) => {
        try {
            // res.send("team page")
            res.render('login', { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            // res.send("team page")
            res.render('register', { message: req.flash('error') })

        } catch (error) {
            console.log(error)
        }
    }


    //register data
    static insertRegister = async (req, res) => {
        try {
            // console.log(req.files.image)
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, { folder: "profile_image" })
            //console.log(imageUpload)
            const { name, email, password, confirm_password } = req.body
            const user = await UserModel.findOne({ email: email })
            //console.log(user)
            if (user) {
                req.flash('error', 'User already registered')
                res.redirect('/register')
            } else {
                if (name && email && password && confirm_password) {
                    if (password == confirm_password) {
                        const hashPassword = await bcrypt.hash(password, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }
                            // confirm_password: confirm_password
                        })
                        await result.save()
                        req.flash('success', 'Account Register Successfully')
                        res.redirect('/')

                    } else {
                        req.flash('error', 'Password does not match')
                        res.redirect('/register')

                    }
                } else {
                    req.flash('error', 'All fields are required')
                    res.redirect('/register')

                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }




    //get details from login form--------------------------------
    static verifylogin = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body
            const user = await UserModel.findOne({ email: email })
            //console.log(user)
            if (user !== null) {
                const ismatch = await bcrypt.compare(password, user.password)
                if (ismatch) {
                    //token create-----------------------------
                    if (user.role === 'admin') {
                        var token = jwt.sign({ ID: user._id }, 'tokencreation@123');
                        //console.log(token)
                        res.cookie('token', token)
                        res.redirect('/admin/dashboard')
                    }
                    if (user.role === 'user') {
                        var token = jwt.sign({ ID: user._id }, 'tokencreation@123');
                        //console.log(token)
                        res.cookie('token', token)
                        res.redirect('/home')
                    }

                } else {
                    req.flash('error', "Email or password does not match");
                    res.redirect('/')
                }
            } else {
                req.flash('error', "You Are not Register user");
                res.redirect('/')
            }

        } catch (error) {
            console.log(error)
        }
    }


    // for logout-----------------------------------

    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    };


    //for contact 
    static insertContact = async (req, res) => {
        try {
            const { first_name, last_name, username, email, first_address, second_address, country, state } = req.body
            const contactresult = new ContactModel({
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                first_address: first_address,
                second_address: second_address,
                country: country,
                state: state
            })
            await contactresult.save()
                .then((contactresult) => {
                    console.log("contact data inserted successfully")

                    res.redirect('/home')
                }).catch((err) => {
                    console.log(err)
                });
        }
        catch (error) {
            console.log(error)
        }
    }


    static profile = async (req, res) => {
        try {
            const { name, image, email } = req.userdata
            res.render('profile', { name: name, image: image, email: email })
        } catch (error) {
            console.log(error)
        }
    }

    static changePassword = async (req, res) => {
        try {
            const { id } = req.userdata;
            //console.log(req.body)
            const { op, np, cp } = req.body;
            if (op && np && cp) {
                const user = await UserModel.findById(id);
                const isMatched = await bcrypt.compare(op, user.password);
                //console.log(isMatched)
                if (!isMatched) {
                    req.flash("error", "Current password is incorrect ");
                    res.redirect("/profile");
                } else {
                    if (np != cp) {
                        req.flash("error", "Password does not match");
                        res.redirect("/profile");
                    } else {
                        const newHashPassword = await bcrypt.hash(np, 10);
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword,
                        });
                        req.flash("success", "Password Updated successfully ");
                        res.redirect("/");
                    }
                }
            } else {
                req.flash("error", "ALL fields are required ");
                res.redirect("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    };

    static updateProfile = async (req, res) => {
        try {
            const { id } = req.userdata;
            const { name, email, role } = req.body;
            if (req.files) {
                const user = await UserModel.findById(id);
                const imageID = user.image.public_id;
                console.log(imageID);

                //deleting image from Cloudinary
                await cloudinary.uploader.destroy(imageID);
                //new image update
                const imagefile = req.files.image;
                const imageupload = await cloudinary.uploader.upload(
                    imagefile.tempFilePath,
                    {
                        folder: "profile_image",
                    }
                );
                var data = {
                    name: name,
                    email: email,
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url,
                    },
                };
            } else {
                var data = {
                    name: name,
                    email: email,
                };
            }
            await UserModel.findByIdAndUpdate(id, data);
            req.flash("success", "Update Profile successfully");
            res.redirect("/profile");
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = FrontController