import express, { Request, Response } from 'express';
import cors from 'cors';
import { Client } from 'pg';
 
const client = new Client({
  user: 'user',
  password: 'password',
  host: 'db',
  port: 5432,
  database: 'pingme',
})

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err, err.message, err.stack));

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    client.query("SELECT NOW()", (err, res) => {
        if (err) {
            console.error("Query error", err.stack);
        } else {
            console.log("Query result:", res.rows);
        }
        client.end();
    });
  res.send('Hello from TypeScript!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
