const User = require('../models/user');
const Code = require('../models/code');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../config/email')

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
            let error = new Error("Conta não verificada.Verifique o teu email");
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
                let error = new Error(`Digitou um login ou uma senha errada. ${attemptsMsg}`);
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

module.exports.confirmCode = async (req, res, next) => {
    try{
        const {code, email, id} = req.body;
        const { type } = req.query;
        //
        if(!code){
            let error = new Error("Insira o teu codigo de confirmação");
            error.statusCode = 400;
            throw error;
        }
        if(!type){
            let error = new Error("Tipo de requisição inválida");
            error.statusCode = 400;
            throw error;
        }
        
        if(type == 'registration' && !email){
            let error = new Error("Email inválido");
            error.statusCode = 400;
            throw error;
        }
        if(type != 'registration' && !id){
            let error = new Error("Falha na autenticação");
            error.statusCode = 400;
            throw error;
        }

        const userCode = await Code.findOne({ $or: [ { user: id}, { email: email } ]});

        if(!userCode){
            let error = new Error("Codigo de autenticação inexistente");
            error.statusCode = 404;
            throw error;
        }else if(userCode.code != code){
            let error = new Error("Codigo inválido");
            error.statusCode = 404;
            throw error;
        }
        //add logic for expirationCodes

        const verifiedUser = await User.findOneAndUpdate({ $or: [ { _id: id}, { email: email } ] }, {
            $set: { verified: true }
        }, {
            useFindAndModify: false
        }).select('-password');
        if(verifiedUser){

            //delete the code after the confirmation
            const _query = id ? { user: id} : { email: email };
            await Code.findOneAndDelete(_query);

            if(type == 'registration'){

                //assign jwt to enable login
                const token = await jwt.sign({id: verifiedUser.id }, JWT_SECRET, {expiresIn: '7d'});
                return res.status(200).json({
                    message: "Conta verificada com sucesso",
                    data: {
                        id: verifiedUser.id,
                        token: token,
                        user: verifiedUser
                    }
                })
            }else{
                return res.status(200).json({
                    message: "Conta verificado com sucesso",
                    data: []
                })
            }
        }


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