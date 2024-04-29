
// Require express and express.Router
const express = require("express");
const router = express.Router();

// Require auth routes
const login = require("./login.routes.js");
const logout = require("./logout.routes.js");
const register = require("./register.routes.js");

// Require middlewares
const checkIfEmailExists = require("../middlewares/checkIfEmailExists.js");


router.post("/login", checkIfEmailExists, login);
router.post("/register", checkIfEmailExists, register);
router.post("/logout", logout);

module.exports = router;