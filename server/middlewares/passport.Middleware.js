// passport.config.js  
import passport from 'passport';  
import OAuth2Strategy from 'passport-google-oauth2';
import userModel from '../models/user.Model.js';
import dotenv from 'dotenv';
import { generateToken } from '../utils/generateToken.js';

dotenv.config({  
    path: './.env'   
});


passport.use(  
    new OAuth2Strategy(  
        {  
            clientID: process.env.GOOGLE_CLIENT_ID,  
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/auth/google/callback',
            scope: ['profile', 'email'],
        },  
        async (accessToken, refreshToken, profile, done) => {  
            try {
                let user = await userModel.findOne({ googleId: profile.id });  

                if (!user) {  
                    user = new userModel({  
                        googleId: profile.id,
                        userName: profile.name.givenName +" " + profile.name.familyName,  
                        email: profile.emails[0].value,
                    });
                    user.googleSignup = true;
                    user.isActive = true;
                    user.isVerified = true; // Assuming initial verification  
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

// Initialize Passport  
export default passport;