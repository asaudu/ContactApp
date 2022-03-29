const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

//create the get request
app.get('/api/contacts', cors(), async (req, res) => {
    // const STUDENTS = [

    //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
    //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
    //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
    //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
    //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
    // ];
    // res.json(STUDENTS);
    try{
        const { rows: contacts } = await db.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch (e){
        return res.status(400).json({e});
    }
});

app.get('/api/phonenumbers', cors(), async (req, res) => {
    try{
        const { rows: phonenumbers } = await db.query('SELECT * FROM phonenumbers');
        res.send(phonenumbers);
    } catch (e){
        return res.status(400).json({e});
    }
});

//contact post request
app.post('/api/contacts', cors(), async (req, res) => {
    const newContact = { firstname: req.body.firstname, lastname: req.body.lastname, notes: req.body.notes }
    console.log([newContact.firstname, newContact.lastname]);
    const result = await db.query(
        'INSERT INTO contacts(firstname, lastname, notes) VALUES($1, $2, $3) RETURNING *',
        [newContact.firstname, newContact.lastname, newContact.notes]
    );
    console.log(result.rows[0]);

    // const newNumber = { phonenumber: req.body.phonenumber, email: req.body.email, owner_id: result.rows[0].owner_id }
    // //console.log([newContact.firstname, newContact.lastname]);
    // const result2 = await db.query(
    //     'INSERT INTO phonenumbers(phone_number, email, owner_id) VALUES($1, $2, $3) RETURNING *',
    //     [newNumber.phonenumber, newNumber.email, newNumber.owner_id]
    // );
    res.json(result.rows[0]);
});
// phone number post request
app.post('/api/phonenumbers', cors(), async (req, res) => {
        const newNumber = { phonenumber: req.body.phonenumber, email: req.body.email, owner_id: req.body.owner_id }
        console.log([newNumber.phonenumber, newNumber.email, newNumber.owner_id]);
        const result = await db.query(
        'INSERT INTO phonenumbers(phone_number, email, owner_id) VALUES($1, $2, $3) RETURNING *',
        [newNumber.phonenumber, newNumber.email, newNumber.owner_id]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

app.put('/api/contacts', cors(), async (req, res) => {
    const newContact = { phonenumber: req.body.phonenumber, email: req.body.email, owner_id: req.body.owner_id }
    console.log([newContact.firstname, newContact.lastname]);
    const result = await db.query(
        'INSERT INTO contacts(firstname, lastname, notes) VALUES($1, $2) RETURNING *',
        [newContact.phonenumber, newContact.email]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

app.put('/api/phonenumbers', cors(), async (req, res) => {
    const newContact = { phonenumber: req.body.phonenumber, email: req.body.email, owner_id: req.body.owner_id }
    console.log([newUser.firstname, newUser.lastname]);
    const result = await db.query(
        'INSERT INTO phonenumbers(firstname, lastname, notes) VALUES($1, $2) RETURNING *',
        [newContact.phonenumber, newContact.email]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});