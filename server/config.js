require("dotenv").config();

module.exports = {
    USER: process.env.USER,
    HOST: process.env.HOST,
    DATABASE: process.env.DATABASE,
    PASSWORD: process.env.PASSWORD,
    DB_PORT: process.env.DP_PORT,
    jwtSecret: process.env.JWT_SECRET,
    PORT: process.env.PORT
};