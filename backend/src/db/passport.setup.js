import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20';


passport.use(new GoogleStrategy({
    //options for strategy
}), ()=>{
    //passport callback function
}


)