const User = require('../models/user');
const Code = require('../models/code');
const { sendEmail } = require('../config/email')
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { fireError } = require('../config/error');

module.exports.sendCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { type } = req.query;

        if (!email) {
            let error = new Error("Adicione o teu email para continuar.");
            error.statusCode = 400;
            throw error;
        }

        if(!type){
            let error = new Error("Tipo de requisição inválida");
            error.statusCode = 400;
            throw error;
        }

        const _user = await User.findOne({ email: email });

        if (_user) {
            //email subject and message depends on request code type field
            let message;
            let subject;

            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 7); //increment +7 minutes from now
            //check if this user have an expiredCode registered
            await Code.findOneAndDelete({
                expiresAt: {
                    $lt: new Date()
                }
            })

            const code = Number(Math.random().toString().substr(2, 4));

            if (type == 'forgotPassword') {
                message = `<p style="text-align: left; font-size: 18px">
                Recebemos uma solicitação de renovação da senha. <br /> Cole o codigo: <b>${code}</b>
                <br /> <small> "O código expira dentro de <span stype="color: orange">7 minutos</span>"</small></p>`;

                subject = 'Password recovery'

                await Code.create({ user: _user.id, code: code, email: email, expiresAt: expirationDate });
                await sendEmail({ receiver: email, message: message, subject: subject })
            }

        }

        return res.status(201).json({
            message: "Se existir uma conta associada com este email, enviaremos uma mensagem com o código de confirmação",
            data: []
        })

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}


module.exports.confirmCode = async (req, res, next) => {
    try{
        const {code, email, id, newPassword } = req.body;
        const { type } = req.query;
        if(!code){
            let error = new Error("Insira o teu codigo de confirmação");
            error.statusCode = 400;
            throw error;
        }
        if(!type){
            let error = new Error("Tipo de requisição inválida");
            error.statusCode = 405;
            throw error;
        }
        
        const validTypes = [ "registration", "forgotPassword"];

        if(!validTypes.includes(type)) fireError({message: "Tipo de requisição inválida", status: 405});
        
        if(type == 'registration' && !email){
            let error = new Error("Email inválido");
            error.statusCode = 400;
            throw error;
        }
        if(type != 'forgotPassword' && !email){
            let error = new Error("Falha na autenticação");
            error.statusCode = 400;
            throw error;
        }

        let _query;
        let _expired = false;
        if(type == 'registration'){
            _query = { 
                $or: [ { user: id}, { email: email } ]
            };
        }else{
            _query = { 
                $or: [ { user: id}, { email: email } ],
                expiresAt: {
                    $gte: new Date()
                }
            }
            _expired = await Code.exists({
                $or: [ { user: id}, { email: email } ],
                code: code,
                expiresAt: {
                    $lt: new Date()
                }
            })
        }

        const userCode = await Code.findOne(_query);


        if(_expired){
            fireError({message: "O teu codigo expirou. Requisite um novo.", status: 409});
        }else if(!userCode){
            let error = new Error("Codigo de autenticação inexistente");
            error.statusCode = 404;
            throw error;
        }else if(userCode.code != code){
            let error = new Error("Codigo inválido");
            error.statusCode = 401;
            throw error;
        }
        
        //set action based on type
        let setAction;
        switch (type){
            case 'registration':
                setAction = { verified: true}
                break
            case 'forgotPassword':
                
                //check if new psssword field is set
                if(!newPassword) fireError({message: "Digite a nova senha para prosseguir", status: 401})
                //check if the user is verified
                const _isVerified = await User.exists({ $or: [ { _id: id}, { email: email } ], verified: true });
                if(!_isVerified) fireError({status: 401, message: "Conta não autenticada. Verifique o teu email"})
                
                const existingUser = await User.findOne({ $or: [ { _id: id}, { email: email } ] });
                //check if the new password is the same as the existing one
                const passwordMatch = await bcrypt.compare(newPassword, existingUser.password);
                if(passwordMatch) fireError({status: 409, message: "Digite uma senha diferente da atual"});
                let salt = await bcrypt.genSalt(12)
                let hash = await bcrypt.hash(newPassword, salt);
                setAction = { password: hash }
                break;
            default:
                fireError({message: "Acão invalida", status: 401});  
        }
        const updatedUser = await User.findOneAndUpdate({ $or: [ { _id: id}, { email: email } ] }, {
            $set: setAction,
            $inc: { __v: 1}
        }, {
            new: true,
            useFindAndModify: false
        }).select('-password');
        if(updatedUser){

            //delete the code after the confirmation
            const _query = id ? { user: id} : { email: email };
            await Code.findOneAndDelete(_query);

            if(type == 'registration'){
 
                //assign jwt to enable login
                const token = await jwt.sign({ id: updatedUser.id }, JWT_SECRET, { expiresIn: '7d' });

                return res.status(200).json({
                    message: "Conta verificada com sucesso",
                    data: {
                        id: updatedUser.id,
                        token: token,
                        user: updatedUser
                    }
                })
            }else if(type == 'forgotPassword'){
                return res.status(201).json({
                    message: "Senha atualizada com sucesso",
                    data: []
                })
            }
        }


    }catch(error){
        if(!error.statusCode) error.statusCode = 500;
        next(error);
    }
}