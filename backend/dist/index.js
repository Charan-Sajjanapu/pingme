"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
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
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    // client.query("SELECT NOW()", (err, res) => {
    //     if (err) {
    //         console.error("Query error", err.stack);
    //     } else {
    //         console.log("Query result:", res.rows);
    //     }
    //     client.end();
    // });
    res.send('Hello from TypeScript!');
});
app.get('/authenticate', (req, res) => {
    if (req.query.mobileNumber == "9573631518") {
        res.send("Authenticated successfully").status(200);
    }
    else {
        res.send("Invalid mobile number").status(401);
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
