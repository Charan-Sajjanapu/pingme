import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
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

const app = express();
const port = 3000;

const SECRET_KEY = "your_secret_key"; // Replace with a secure key

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware to verify JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).send("Invalid Token");
      return;
    }
    req.user = user; // Attach user info to request
    next();
  });
};

app.post('/authenticate', (req: Request, res: Response) => {
  const { mobileNumber } = req.body;
  if (mobileNumber === "9573631518") {
    const token = jwt.sign({ mobileNumber }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: "Authenticated successfully", token });
  } else {
    res.status(401).json({ message: "Invalid mobile number" });
  }
});

// Example of a protected route
app.get('/protected', authenticateToken, (req: Request, res: Response) => {
  res.status(200).send("This is a protected route");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;