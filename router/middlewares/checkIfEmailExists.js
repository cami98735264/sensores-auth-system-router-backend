const sequelize = require('../../database/coneccion.js');

const { DataTypes } = require('sequelize');

const User = require('../../models/usuarios.js')(sequelize, DataTypes);


const checkIfEmailExists = async (req, res, next) => {
    const { email } = req.body;
    if(!email) {
        return res.status(400).json({ message: "El email es requerido" });
    };
    const foundEmail = await User.findOne({ where: { email } });
    if (foundEmail) {
        req.foundUser = foundEmail;
    }
    next();
}


module.exports = checkIfEmailExists;