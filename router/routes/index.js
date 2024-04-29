const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const check = require("./check.routes.js");
const router = express.Router();



router.get("/check", isAuthenticated, check);




module.exports = router;