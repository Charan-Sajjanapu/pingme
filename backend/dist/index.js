"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: 'user',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'pingme',
});
client
    .connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Connection error", err.stack));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    client.query("SELECT NOW()", (err, res) => {
        if (err) {
            console.error("Query error", err.stack);
        }
        else {
            console.log("Query result:", res.rows);
        }
        client.end();
    });
    res.send('Hello from TypeScript!');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
