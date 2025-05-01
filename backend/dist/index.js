"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { Client } from 'pg';
// const client = new Client({
//   user: 'user',
//   password: 'password',
//   host: 'db',
//   port: 5432,
//   database: 'pingme',
// })
// client
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((err) => console.error("Connection error", err, err.message, err.stack));
const app = (0, express_1.default)();
const port = 3000;
const SECRET_KEY = "your_secret_key"; // Replace with a secure key
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // To parse JSON request bodies
// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).send("Access Denied");
        return;
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).send("Invalid Token");
            return;
        }
        req.user = user; // Attach user info to request
        next();
    });
};
app.post('/authenticate', (req, res) => {
    const { mobileNumber } = req.body;
    if (mobileNumber === "9573631518") {
        const token = jsonwebtoken_1.default.sign({ mobileNumber }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Authenticated successfully", token });
    }
    else {
        res.status(401).json({ message: "Invalid mobile number" });
    }
});
// Example of a protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).send("This is a protected route");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
