
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const {user} = require('./models/user') ;
exports.initializingPassport = (passport) =>{
    
    
    passport.use(new LocalStrategy({usernameField:'email'},async (email,password,done)=>{
        const knocker = await user.findOne({email:email})
        
        try {
            if(!knocker) return done(null , false , {message : 'No User with that email'});
          
           
        if(await bcrypt.compare(password , knocker.password)) return done(null,knocker);
       
        return done(null , false , {message:'Password Incorrect'});
        
        } catch (error) {
            return done(error , false);
        }
    }))
   
    passport.serializeUser(async(id,done)=>{
        done(null , id);
    })
    passport.deserializeUser(async (id , done) =>{
        try{
            const knocker = await user.findById(id)
            done(null , id);
        }
        catch(err){
            done(err , false);
        }
    })

}


exports.isAuthenticated = (req,res,next)=>{
    if(req.user) return next();
    res.redirect('/login');
}