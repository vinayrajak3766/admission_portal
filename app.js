const express = require('express')
const app = express()
const port = 3001

//cookie parsar 
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');
//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }));
//Flash messages
app.use(flash());

//Temp file uploader
const fileUpload = require("express-fileupload");

app.use(fileUpload({useTempFiles: true}));

//database connection
const connectdb = require('./database/connectdb')

//database function call
connectdb()

//parse application/x-www-form-urlencoded for recive data from form
app.use(express.urlencoded({ extended: false }))

//for view ejs engine 
app.set('view engine', 'ejs')

//import and load routes/web page
const web = require('./routes/web')


//for import static file css/javascript/images
app.use(express.static('public'))

//routes use function
app.use('/', web)

//   for console 
app.listen(port, () => {
  console.log(`Server Working fine on port ${port}`)
})