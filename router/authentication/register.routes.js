const express = require("express");
const jwt = require("jsonwebtoken");
const sequelize = require("../../database/coneccion.js");
const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/usuarios.js")(sequelize, DataTypes);
const bcrypt = require("bcrypt");


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
        const newUser = await User.create({ 
            email, contraseña: hashedPassword, nombres: names, primer_apellido: lastname, segundo_apellido: second_lastname, telefono 
        });
        const payload = { id: newUser.id_usuario, email: newUser.email, names: newUser.nombres, lastname: newUser.primer_apellido, second_lastname: newUser.segundo_apellido, telefono: newUser.telefono };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        // Set cookie to max age 1 hour
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false, maxAge: 3600000 });
        res.status(201).json({...payload, success: true, token });

    } catch(err) {
        res.status(400).json({ message: err.message, success: false });
    }
}


module.exports = register;