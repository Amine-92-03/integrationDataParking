import nodemailer from 'nodemailer'
import dotenv from 'dotenv' 
dotenv.config()

function sendMail(message){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASSWORD_MAIL
        }
      });
      console.log(transporter);
      
      var mailOptions = {
        from: 'bigdatamspr@gmail.com',
        to: 'bigdatamspr@gmail.com',
        subject: message.subject,
        // text: message,
        html: `<h1>Bonjour Amine! Rapport de l'application :</h1><h4>${message.text}</h4>`
      };
      let sendmail = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
}

export default sendMail
