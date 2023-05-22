const nodemailer = require('nodemailer');

async function sendActivationEmail(userEmail:any, activationToken:any) {
    // crea un objeto de transporte con los detalles de autenticación del servicio de correo electrónico
    let transporter = nodemailer.createTransport({
      service: 'cyberzon3',
      auth: {
        user: 'no-reply@cyberzon3.com', // tu correo electrónico
        pass: 'CyberZon3-2023', // tu contraseña
      },
    });
  
    // crea el cuerpo del correo electrónico
    let mailOptions = {
      from: 'no-reply@cyberzon3.com',
      to: userEmail,
      subject: 'Activa tu cuenta',
      text: `Hola! Haz clic en el siguiente enlace para activar tu cuenta: http://www.cyberzon3.com/activar-cuenta/${activationToken}`,
    };
  
    // envía el correo electrónico
    let info = await transporter.sendMail(mailOptions);
    console.log(`Correo electrónico enviado a ${userEmail}: ${info.messageId}`);
  }
  export default {
    host: '993', // Por ejemplo, 'smtp.gmail.com'
    port: '465', // Por ejemplo, 465 para SSL o 587 para TLS
    secure: true, // Cambia a "false" si no usas SSL/TLS
    auth: {
      user: 'no-reply@cyberzon3.com', // Tu dirección de correo electrónico
      pass: 'CyberZon3-2023', // Tu contraseña de correo electrónico
    },
  };
  module.exports = sendActivationEmail;