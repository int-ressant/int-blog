const nodemailer = require('nodemailer');
const user = 'testing@tomascaetano.com';

// Create the email transporter
const transporter = nodemailer.createTransport({
    host: "mail.tomascaetano.com",
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: 'e@-1^P_3k.,f'
    },
    tls:{
        rejectUnauthorized: false
    }
});

module.exports.sendEmail = async ({receiver, message, subject}) => {
    try{
        await transporter.sendMail({
            from: user,
            to: receiver,
            subject: subject,
            html: message
        }, (err, info) => {
            if(err){
                console.log('Error trying to send email');
                console.log(err)
            }else{
                console.log('email sent!');
            }
        })
    }catch(error){
        console.log('Transporter error', error)
    }
}
