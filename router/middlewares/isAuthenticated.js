const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;


const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No se suministró ningún token", success: false });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido", success: false });
        }
        req.user = user;
        console.log(user);
        next();
    });
}


module.exports = isAuthenticated;