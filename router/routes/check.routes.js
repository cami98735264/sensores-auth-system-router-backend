const check = (req, res) => {
    res.status(200).json({ message: "El usuario está autenticado correctamente", success: true, data: req.user });
}


module.exports = check;