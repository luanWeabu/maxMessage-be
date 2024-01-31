const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'maxlie1',
    database: 'max_message'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});


//get data
app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/emails', (req, res) => {
    let sql = 'SELECT * FROM emails';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/folder', (req, res) => {
    let sql = 'SELECT * FROM folder';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});



//Create data
app.post('/users', (req, res) => {
    let sql = 'INSERT INTO users SET ?';
    const { user_id, user_name, user_email, user_password } = req.body; // Adjusted variable names
    const user = { user_id, user_name, user_email, user_password }; // Changed variable names here as well

    db.query(sql, user, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});
app.post('/emails', (req, res) => {
    let sql = 'INSERT INTO emails SET ?';
    const { sender_id, receiver_email, subject, body, date_time, folder_id } = req.body;
    const email = { sender_id, receiver_email, subject, body, date_time, folder_id };

    db.query(sql, email, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});
app.post('/folders', (req, res) => {
    let sql = 'INSERT INTO folders SET ?';
    const { user_id, folder_name } = req.body;
    const folder = { user_id, folder_name };

    db.query(sql, folder, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});





//Edit data
app.put('/users/:id', (req, res) => {
    let sql = `UPDATE tblUser SET ? WHERE intUserID = ${req.params.id}`;
    let updatedUser = req.body;
    db.query(sql, updatedUser, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


//delete data
app.delete('/users/:id', (req, res) => {
    let sql = `DELETE FROM tblUser WHERE intUserID = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
