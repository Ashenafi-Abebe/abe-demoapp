const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const dbConfig = {
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if (error) {
    console.log("Connection error:", error);
  } else {
    console.log("Connected to the database");
  }
});

// allow cross origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Route handler for adding an employee
app.post("/add-employee", (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password } = req.body;

  const query = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
  connection.query(
    query,
    [first_name, last_name, email, password],
    (error, result) => {
      if (error) {
        console.log("Error adding employee:", error);
        res.status(500).json({ error: "Error adding employee" });
      } else {
        console.log("Employee added successfully");
        res.status(200).json({ message: "Employee added successfully" });
      }
    }
  );
});

// Route handler for employee login
app.post("/login", (req, res) => {
  console.log(req.body);
  // write the sql qurey to retrive the employe with the email and password provided by the user and  copare it with the data in the database
  const sql = `SELECT * FROM employee_test WHERE email = ? AND password = ?`;
  connection.query(
    sql,
    [req.body.email, req.body.password],
    (error, result) => {
      if (error) {
        console.log("Error logging in:", error);
        res.status(500).json({ error: "Error logging in" });
      } else {
        if (result.length > 0) {
          console.log("Login successful");
          res.status(200).json({ message: "Login successful" });
        } else {
          console.log("Invalid email or password");
          res.status(401).json({ error: "Invalid email or password" });
        }
      }
    }
  );
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
