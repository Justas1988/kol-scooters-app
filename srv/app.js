const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'kolt_scooters'
})

con.connect(err => { //start connection
    if (err) {
        throw err;
    }
    console.log('Yes!');
})

app.get('/scooters', (req, res) => { //read scooters
    con.query('SELECT * FROM scooters ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

app.post('/scooters', (req, res) => {
    console.log(req.body.title)
    const sql = `
        INSERT INTO scooters
        (registration_code, is_busy, last_use_time, total_ride_kilometers)
        VALUES (?, ?, ?, ?)
        `;
    con.query(sql, [req.body.id, req.body.busy, req.body.date, req.body.ride], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

app.delete('/scooters/:id', (req, res) => { //delete
    const sql = `
        DELETE FROM scooters
        WHERE registration_code = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

app.put('/scooters/:id', (req, res) => { //edit date
    const sql = `
        UPDATE scooters
        SET registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometers = ?
        WHERE registration_code = ?
        `;
    con.query(sql, [req.params.id, req.body.busy, req.body.date, req.body.ride, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})