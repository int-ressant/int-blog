const router = require('express').Router();
const passport = require('passport');
const { getType, setType } = require('../config/global')
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

//Google oAuth routes
router.get('/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
] } ));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure'}), async (req, res) => {
    
    let response = req.user;
    if(String(response.status).startsWith('2')){
        const token = await jwt.sign({id: response.user.id }, JWT_SECRET, { expiresIn: '7d'});

        return res.status(200).json({
            message: response.message,
            data: {
                id: response.user.id,
                token: token,
                user: response.user
            }
        })
    }else{
        return res.status(response.status).json({
            message: response.message,
            data: []
        })
    }

})

//authenticate routes for testing with btns
router.get('/llogin', (req, res)=> {
    res.send(`<div style='text-align: center; font-size: 22px;padding-top: 40px;'>
            <a href='/auth/google' style='background-color: #db3236; padding: 13px 35px; color: white;text-decoration: none'>Google</a>
    </div>`)
})

router.post('/google/login', (req, res)=> {
    setType('login');
    return res.redirect('/auth/google');
})

router.post('/google/register', (req, res)=> {
    setType('register');
    return res.redirect('/auth/google');
})

//failure route
router.get('/failure', (req, res) => {
    
    return res.status(401).json({
        message: "Houve um erro ao realizar o login",
        data: []
    })
})

module.exports = router