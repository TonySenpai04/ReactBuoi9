
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors=require("cors");

app.use(bodyParser.json());
  app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'reactdb'
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

app.post('/addCourse', (req, res) => {
  const { name, course, message } = req.body; 
  const sql = 'INSERT INTO khoahoc (Name, Course, Message) VALUES (?, ?, ?)';
  connection.query(sql, [name, course, message], (error, results, fields) => {
    if (error) {
     
      console.error('Error adding course:', error);
      res.status(500).json({ error: 'Failed to add course' });
      return;
    }
    res.json({ message: 'Course added successfully' });
  });
});
app.get('/Course', (req, res) => {
  const sql = 'SELECT * FROM khoahoc';

  connection.query(sql, (error, results, fields) => {
    if (error) {
      
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
      return;
    }

    res.json(results);
  });
});
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});