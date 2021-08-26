const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const { fireError } = require('./error');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.jwtValidation = async (req, res, next) => {
    try{
        const authorization = req.headers.authorization;
        console.log(req.headers)
        if(!authorization){
            fireError({status: 401, message: "Você precisa estar logado para continuar."})
        }
        const token = authorization.replace('Bearer ', "");
        let userId;
        jwt.verify(token, JWT_SECRET,(err, payload) => {
            if(err){
                fireError({status: 401, message: "Invalid token"})
            }
            userId = payload.id;
        });
        const _user = await User.findById(userId);
        
        //check if this user was suspended or deleted
        if(_user.suspended) fireError({status: 401, message: "Conta bloqueada. Contacte o suporte"})
        if(_user.deleted) fireError({status: 404, message: "Conta inexistente."})
        req.user = _user;
        next();
        
    }catch(error){
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}