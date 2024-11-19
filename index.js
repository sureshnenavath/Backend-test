const sqlite3 = require('sqlite3');
const express = require('express');
const app = express();
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) return console.error(err.message);

    console.log('Connected to the database.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  )
`);

const values = ['Karingu Ravi', 'ravi@gmail.com', '1234567'];
const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
db.run(query, values, (err) => {
    if (err) return console.error(err.message);

    console.log('A row has been inserted.');
});

let result = ''

db.all(`SELECT * FROM users `, (err, row) => {
    if (err) return console.error(err.message);
    result = row;
    console.log(row);
});
// db.close((err) => {
//     if (err) return console.error(err.message);

//     console.log('Close the database connection.');
// });

app.get('/', (req, res) => {
    res.send(result);
})

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
})