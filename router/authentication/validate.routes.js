
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/coneccion.js");
const User = require("../../models/usuarios.js")(sequelize, DataTypes);


const validate = async (req, res) => {
    const { urlValidationCode } = req.params;
    if(!urlValidationCode) {
        return res.status(400).json({ message: "No se ha enviado un código de validación", success: false });
    }
    try {
        const user = await User.findOne({ where: { url_validacion: urlValidationCode } });
        if(!user) {
            return res.status(400).json({ message: "No se encontró un usuario con ese código de validación", success: false });
        }
        await user.update({ estado: true, url_validacion: null });
        // Send an stylized html content with a message that the account has been validated
        res.status(200).send(`
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                        .container {
                            background-color: white;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                            margin-bottom: 20px;
                        }
                        p {
                            color: #555;
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Cuenta validada</h1>
                        <p>Tu cuenta ha sido validada exitosamente</p>
                    </div>
                </body>
            </html>

        `)
    } catch(err) {
        // Send the same html content but with a message that the account could not be validated
        res.status(400).send(`
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                        .container {
                            background-color: white;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                            margin-bottom: 20px;
                        }
                        p {
                            color: #555;
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Error al validar cuenta</h1>
                        <p>No se pudo validar tu cuenta, por favor intenta de nuevo generando un nuevo link</p>
                    </div>
                </body>
            </html> 
        `)
    }
}

module.exports = validate;