const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: false
        });
        res.status(200).json({ message: "Sesión cerrada", success: true });
    } catch(err) {
        res.status(400).json({ message: err.message, success: false });
    }
}


module.exports = logout;