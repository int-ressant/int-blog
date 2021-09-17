const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { getType, setType } = require('./global')

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const userObj = {
            googleId: profile.id,
            username: profile.displayName.split(' ').join(''),
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
            verified: profile.emails[0].verified,
        }
        const user = await User.findOne({email: userObj.email}).select('-password');

        /**
         * This response will help to determine whether the login or registration is valid or not
         */
        let response = {}
        //if the user hit the login button
        if(getType() == 'login'){
            if(user){

                response = {
                    message: "Login realizado com sucesso",
                    user: user,
                    status: 200
                }
                done(null, response)
            }else{
                response.message = "Conta inexistente";
                response.status = 404;
                done(null, response)
            }

        }else if(getType() == 'register'){
            
            //if the user hit the register button
            if(user){
                response = {
                    message: "Esta conta já foi registrada",
                    status: 401,
                    user: user
                }
                done(null, response)
            }else{
                const newUser = await User.create(userObj);
                if(newUser){
                    response = {
                        message: "Conta registrada com sucesso",
                        status: 201,
                        user: newUser
                    }
                    done(null, response);
                }else{
                    response = {
                        message: "Houve um erro ao criar conta",
                        status: 409
                    }
                    done(null, response)
                }
                
            }
        }else{
            response.message = "Requisição inválida",
            response.status = 401;
            done(null, response)
        }
        
    }))

    passport.serializeUser((user, done) => {
        //console.log('serializeUser');
        done(null, user)
    });

    passport.deserializeUser( (user, done) => {
        console.log('deserializeUser');
        done(null, user)
    })
}