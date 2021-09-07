const User = require('../models/user');
const Code = require('../models/code');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../config/email')
const defaultPaginationSize = parseInt(process.env.DEFAULT_PAGINATION_SIZE);

module.exports.createUser = async (req, res, next ) => {
    try {
        const { email, password, username, gender } = req.body;

        //validate fields
        if(!username){
            let error = new Error("Adicione o nome do usuario para continuar.");
            error.statusCode = 400;
            throw error;
        }

        if(!password){
            let error = new Error("Defina a tua senha para continuar.");
            error.statusCode = 400;
            throw error;
        }
        
        if(!email){
            let error = new Error("Adicione o teu email para continuar.");
            error.statusCode = 400;
            throw error;
        }

        const _user = await User.findOne({ $or: [ { email: email}, { username: username } ]});
        
        if(_user){
            let error = new Error("Selecione outro email ou nome do usuario diferente.");
            error.statusCode = 401;
            throw error;
        }else{
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                username: username,
                email: email,
                password: hash,
                gender: gender || "Undefined"
            });
            const createdUser = await User.create(newUser);
            if(createdUser){
                //registration code
                const code = Number(Math.random().toString().substr(2, 4));
                const message = `${username} Seja bem vindo a melhor comunidade de programadores de Moçambique. \nCole o codigo abaixo para confirmar a tua conta: ${code}`;
                await Code.create({user: createdUser.id, code: code, email: email});
                await sendEmail({receiver: email, message, subject: 'Registration'})
                return res.status(201).json({
                    message: "Conta cadastrada com sucesso",
                    data: []
                })
            }else{
                let error = new Error("Houve um erro ao criar conta. Tente mais tarde");
                error.statusCode = 500;
                throw error;
            }
        }
        
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.signin = async (req, res, next ) => {
    try {
        const { email, password, username } = req.body;

        //validate fields
        if(!username && !email){
            let error = new Error("Adicione o nome do usuario ou email para continuar.");
            error.statusCode = 400;
            throw error;
        }

        if(!password){
            let error = new Error("Adicione a tua senha para continuar.");
            error.statusCode = 400;
            throw error;
        }

        const _user = await User.findOne({ $or: [ { email: email}, { username: username } ]});
        if(!_user.verified){
            let error = new Error("Conta não autenticada. Verifique o teu email");
            error.statusCode = 400;
            throw error;
        }

        if(_user.suspended.status){
            let error = new Error("Conta suspensa. Contacte o suporte");
            error.statusCode = 400;
            throw error;
        }
        
        if(_user){

            //check if password match
            const passwordMatch = await bcrypt.compare(password, _user.password);
            if(!passwordMatch){
                if(_user.loginAttempts == 1){
                    _user.suspended = {
                        status: true,
                        reason: "Muitas tentativas de login"
                    }
                };
                if(_user.loginAttempts > 0) _user.loginAttempts -= 1 ;
                _user.save()
                //define a message to know write attempt or attempts
                const attemptsMsg = _user.loginAttempts == 1 ? "( 1 tentativa restante)" : `(${_user.loginAttempts} tentativas restantes)` 
                let error = new Error(`Digitou login ou uma senha errada. ${attemptsMsg}`);
                error.statusCode = 400;
                throw error;
            }

            //if password match
            const updatedUser = await User.findOneAndUpdate({ $or: [ { email: email}, { username: username } ]}, { $set: {loginAttempts : 8 }, $inc: { __v: 1 }}, {
                useFindAndModify: false,
                new: true
            }).select('-password');
            const token = await jwt.sign({id: _user.id }, JWT_SECRET, { expiresIn: '7d'});

            return res.status(201).json({
                message: "Login realizado com sucesso",
                data: {
                    id: _user.id,
                    token: token,
                    user: updatedUser
                }
            })
        }else{
            let error = new Error("Digitou um login ou uma senha errada.");
            error.statusCode = 400;
            throw error;
        }
        
    } catch (error) {
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.getUsers = async (req, res, nex) => {
    try{

        //pagination
        const _page = parseInt(req.query.page) || 1;
        const _offset = parseInt(req.query.offset) || defaultPaginationSize;
        const _query = {};
        const users = await User.find(_query).skip((_page - 1) * _offset).limit(_offset).sort({ createdAt: -1}).select("-password")
        
        const _total = await User.countDocuments(_query);
        const _totalPages = Math.ceil(_total / parseInt(_offset));
        let _next = null;
        let _previous = null;
        if (_page < _totalPages) _next = _page + 1;
        if (_page > 1 && _total > 0) _previous = _page - 1;

        return res.status(200).json({
            message: "Sucesso",
            previous: _previous,
            next: _next,
            currentPage: _page,
            total: _total,
            data: users
        })

    }catch(error){
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

module.exports.getUserByUsernane = async (req, res, nex) => {
    try{
        const { username } = req.params;

        const users = await User.findOne({username: username}).select("-password");

        return res.status(200).json({
            message: "Sucesso",
            data: users
        })

    }catch(error){
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}
module.exports.forgotPassword = async (req, res, next) => {
    try{
        
        const { id } = req.user;
    }catch(error){
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}