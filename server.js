const express = require('express');
const app = express();
const notes = require('./db/db.json')
const PORT = 3001; // probably need different port number for Heroku

// set up HTML routes -- res.send

// GET * should return the index.html file

app.get('/', (req, res) => {
    res.send('index.html');
})
// GET /notes should return the notes.html file

app.get('/notes', (req, res) => {
    res.send('notes.html'); // will need path at Heroku site
})

// set up API routes -- res.json
// GET /api/notes should read the db.json file and return all saved notes as JSON

app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query);
    res.json(results);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
// each note will need a unique ID

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
})


app.listen(PORT, () => {
    console.log(`API server now on PORT ${PORT}`);
});