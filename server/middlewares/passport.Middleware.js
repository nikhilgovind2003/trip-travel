// passport.config.js  
import passport from 'passport';  
import OAuth2Strategy from 'passport-google-oauth2';  
import {userModel} from '../models/Models.js'; // Adjust path as needed  
import dotenv from 'dotenv';  
import { generateToken } from '../utils/index.js';

dotenv.config({  
    path: './.env'   
});  

passport.use(  
    new OAuth2Strategy(  
        {  
            clientID: process.env.GOOGLE_CLIENT_ID,  
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
            callbackURL: '/google/callback',  
            scope: ['profile', 'email'],
        },  
      async (accessToken, refreshToken, profile, done) => {  
          console.log(profile)
            try {  
                let user = await userModel.findOne({ googleId: profile.id });  

                if (!user) {  
                    user = new userModel({  
                        googleId: profile.id,  
                        username: profile.name.username,  
                        email: profile.emails[0].value,
                    });  
                    user.googleSignup = true;
                    user.isActive = true;
                    user.isVerified = true;
                    await user.save();  
                } else {
                    user.googleSignup = false;
                    user.isActive = true;
                    await user.save();  
                }

                const token = generateToken(user?._id);

                return done(null, { user, token }); // Pass user and token data  
            } catch (error) {  
                return done(error, null);  
            }  
        }  
    )  
);

passport.serializeUser((user, done)=> done(null, user));
passport.deserializeUser((user, done)=> done(null, user));

// Initialize Passport  
export default passport;