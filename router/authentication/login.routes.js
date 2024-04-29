const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


const login = async (req, res) => {
    const { password } = req.body;
    if(!password) {
        return res.status(400).json({ message: "Todos los campos son requeridos", success: false });
    }
    if(!req.foundUser) {
        return res.status(400).json({ message: "No existe un usuario con ese email", success: false });
    }
    try {
        const match = bcrypt.compareSync(password, req.foundUser.contraseña);
        if(!match) {
            return res.status(400).json({ message: "La contraseña no es correcta", success: false });
        }
        const payload = { id: req.foundUser.id_usuario, email: req.foundUser.email, names: req.foundUser.nombres, lastname: req.foundUser.primer_apellido, second_lastname: req.foundUser.segundo_apellido, telefono: req.foundUser.telefono };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        // Set cookie to max age 1 hour
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false, maxAge: 3600000 });
        res.status(200).json({...payload, success: true, token});
        console.log({... payload, token});
    } catch(err) {
        res.status(400).json({ message: err.message, success: false });
    }
};


module.exports = login;