const router = require('express').Router();
const passport = require('passport');
const { getType, setType } = require('../../config/global')
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

router.get('/facebook', passport.authenticate('facebook'));

//callback url
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/facebook/failure'}), async(req, res) => {
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
});

router.get('/facebook/login', (req, res)=> {
    setType('login');
    return res.redirect('/auth/facebook');
})

router.get('/facebook/register', (req, res)=> {
    setType('register');
    return res.redirect('/auth/facebook');
})

//failure route
router.get('/facebook/failure', (req, res) => {
    
    return res.status(401).json({
        message: "Houve um erro ao realizar a operação",
        data: []
    })
})

module.exports = router