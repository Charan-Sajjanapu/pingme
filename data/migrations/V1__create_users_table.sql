CREATE TABLE users (
    id uuid PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    profileName VARCHAR(50),
    profiePic VARCHAR(300),
    about VARCHAR(1000),
    createdAt Date
)