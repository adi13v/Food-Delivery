if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;
const newRouter = require('./routes/new');
const orderRouter = require('./routes/order')
const initializePassport = require('./passport-config')
const methodOverride = require('method-override');
const url = process.env.URI;
const connectDB = require('./db/connect')
const {Restaurant , Menu} = require('./models/restaurant');
const {registerNewUser} = require('./controllers/registerController')
const {loginUser} = require('./controllers/loginController')
const passport = require("passport");
const expressSession = require('express-session');
const flash = require('express-flash')
const session = require('express-session')
const {initializingPassport , isAuthenticated} = require("./passport-config.js");


app.use(flash());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized : false,
    cookie:{maxAge : 6000000000}
}))

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine' ,'ejs' )
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(express.urlencoded( {extended:false} ))
app.use(express.json());
const start = async()=>{
    try{
        await connectDB(url);
        app.listen(port , console.log("Little Chef"));
    }
    catch(err) {
        console.log(err);
    }
}
start();

initializingPassport(passport)


app.get('/login' , async(req,res)=>{
    res.render('login' , {message:""})
})

app.post('/login' , passport.authenticate("local" , {
    failureRedirect:'/login',
    successRedirect:'/',
    failureFlash : true
})  
)

app.get('/register' ,async(req,res)=>{
    res.render('register')
})

app.post('/register' , registerNewUser)

app.get('/' , isAuthenticated ,async(req,res)=>{
    const restaurants = await Restaurant.find();
    res.render('index' , {restaurants:restaurants , name:req.user.name });
})
 
app.get('/logout'  , (req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
    } , res.redirect('/'))
})
app.post('/cart' , isAuthenticated,(req,res)=>{
    console.log(req.body);
})

app.get('/cart' , (req,res)=>{
    res.json(req.body);
})
app.use('/new' ,newRouter)
app.use('/order' , orderRouter );

