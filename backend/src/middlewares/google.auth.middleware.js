// backend/middlewares/google.auth.middleware.js

import passport from "passport";
import { Strategy as GoogleOAuthStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js"; 
import crypto from 'crypto'

function generateRandomString(length) {
  console.log(crypto.randomBytes(length / 2).toString('hex') )
  return crypto.randomBytes(length / 2).toString('hex'); 
}
// Initialize the Google OAuth Strategy
passport.use(
  new GoogleOAuthStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://vid-stream-two.vercel.app/auth/google/callback"
          : "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          // User exists
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
          // return done(null, user);
        } else {
          // Create a new user
          const newUser = new User({
            googleId: profile.id,
            username: profile.emails[0].value,
            email: profile.emails[0].value,
            fullname: profile.displayName,
            avatar: profile.photos[0].value,
            password : generateRandomString(16)
       
          });

          user = await newUser.save();

         console.log(user)
        //   return done(null, user);
        }
        return done(null, { user, accessToken, refreshToken });
      } catch (error) {
        console.error("Error during Google OAuth Strategy:", error);
        return done(error, false);
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  // Store user.googleId in the session
  done(null, user.user.googleId); // Make sure this is user.googleId and not user._id
});

// Deserialize user from the sessions
passport.deserializeUser(async (googleId, done) => {
  try {
    // Find user by googleId instead of _id
    const user = await User.findOne({ googleId });
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
