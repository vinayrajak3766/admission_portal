const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkAuth = require('../middleware/auth')  // check authentication
const CourseModel = require('../models/course')
const CourseController = require('../controllers/CourseController')
const AdminController = require('../controllers/AdminController')
const isLogin = require('../middleware/islogin')  //if login then open home page
const adminroll = require('../middleware/adminroll') // if user logged in the admin page not open

//routing method
route.get('/',isLogin, FrontController.login)

route.get('/register', FrontController.register)
route.get('/home',checkAuth, FrontController.home)
route.get('/about', checkAuth,FrontController.about)
route.get('/contact',checkAuth, FrontController.contact)
route.get('/team',checkAuth, FrontController.team)
route.get('/logout', FrontController.logout)
route.get('/profile',checkAuth, FrontController.profile)
route.post('/changePassword',checkAuth,FrontController.changePassword)
route.post('/updateProfile',checkAuth,FrontController.updateProfile)


//insert data route
route.post('/insertregister', FrontController.insertRegister)
route.post('/verifylogin', FrontController.verifylogin)
route.post('/insertContact', FrontController.insertContact)


//course controller 
route.post('/course_insert',checkAuth, CourseController.courseInsert)
route.get('/course_display',checkAuth, CourseController.courseDisplay)
route.get('/courseView/:id', checkAuth, CourseController.courseView)
route.get('/courseEdit/:id', checkAuth, CourseController.courseEdit)
route.get('/courseDelete/:id', checkAuth, CourseController.courseDelete)
route.post('/course_update/:id', checkAuth, CourseController.courseUpdate)

//admin route
route.get('/admin/dashboard', checkAuth,adminroll('admin'), AdminController.dashboard)
route.post('/update_status/:id',checkAuth,AdminController.update_status)


module.exports = route


