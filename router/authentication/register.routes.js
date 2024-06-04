const express = require("express");
const jwt = require("jsonwebtoken");
const sequelize = require("../../database/coneccion.js");
const { DataTypes } = require("sequelize");
// get ipv4 without packages
const os = require("os");
const ifaces = os.networkInterfaces();
let ip = "";
Object.keys(ifaces).forEach((ifname) => {
    let alias = 0;
    ifaces[ifname].forEach((iface) => {
        if ("IPv4" !== iface.family || iface.internal !== false) {
            return;
        }
        if (alias >= 1) {
            ip = iface.address;
        } else {
            ip = iface.address;
        }
        ++alias;
    });
});
console.log(ip);
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/usuarios.js")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = process.env;
console.log(EMAIL, PASSWORD);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bolrigo23@gmail.com',
      pass: 'rwwi qefe rgfd uagu'
    }
  });

const register = async (req, res) => {
    const { acceptCookies, email, password, names, lastname, second_lastname, telefono } = req.body;
    if(!acceptCookies || !email || !password || !names || !lastname || !telefono) {
        return res.status(400).json({ message: "Todos los campos son requeridos", success: false });
    }
    if(req.foundUser) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email", success: false });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const urlValidationCode = crypto.randomBytes(20).toString("hex");
        const newUser = await User.create({ 
            email, contraseña: hashedPassword, nombres: names, primer_apellido: lastname, segundo_apellido: second_lastname, telefono, url_validacion: urlValidationCode, estado: false
        });
        const mailOptions = {
            from: 'bolrigo23@gmail.com',
            to: email,
            subject: 'Valida tu cuenta',
            text: `Por favor valida tu cuenta haciendo click en el siguiente link: http://${ip}:3000/api/auth/validate/${urlValidationCode}`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(400).json({ message: "No se pudo enviar un mensaje a ese email, asegurate de que sea válido", success: false });
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
        res.status(200).json({ message: "Usuario generado exitosamente, verifica tu cuenta", success: true });
    } catch(err) {
        res.status(400).json({ message: err.message, success: false });
    }
}


module.exports = register;