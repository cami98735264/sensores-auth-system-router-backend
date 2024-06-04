
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/coneccion.js");
const User = require("../../models/usuarios.js")(sequelize, DataTypes);
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bolrigo23@gmail.com',
      pass: 'rwwi qefe rgfd uagu'
    }
  });

const generate_code = async (req, res) => {
    const { email } = req.body;
    if(!email) {
        return res.status(400).json({ message: "El email es requerido para generar el código", success: false });
    }
    const user = await User.findOne({ where: { email } });
    if(!user) {
        return res.status(400).json({ message: "No se encontró un usuario con ese email", success: false });
    }
    if(user.estado === false) {
        return res.status(400).json({ message: "Por favor verifica tu cuenta antes de generar un código", success: false });
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    await user.update({ codigo_sesion: code });
    const mailOptions = {
        from: 'bolrigo23@gmail,com',
        to: email,
        subject: 'Código de inicio de sesión',
        text: `Tu código de inicio de sesión es: ${code}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json({ message: "No se pudo enviar un mensaje a ese email, asegurate de que sea válido", success: false });
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

    res.status(200).json({ message: "Código de inicio de sesión generado exitosamente, revisa tu correo electrónico", success: true });

}


module.exports = generate_code;