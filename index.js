const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./database/coneccion.js");
const IsAuthenticated = require("./router/middlewares/isAuthenticated.js");

// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST"]
}));


// Routes
app.use("/api/auth", require("./router/authentication/index.js"));
app.use("/api/", require("./router/routes/index.js"));

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

