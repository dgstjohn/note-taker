const express = require('express');
const path = require('path');
const uniqid = require('uniqid');
// const index = require('./public/assets/js/index.js');
const app = express();
const notes = require('./db/db.json');
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// set up API routes -- res.json
// GET /api/notes should read the db.json file and return all saved notes as JSON

app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query);
    res.json(results);
    console.log(results);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
// each note will need a unique ID

app.post('/api/notes', (req, res) => {
    const addNote = req.body(activeNote);
    addNote.id = uniqid()
    console.log(addNote);
    notes.push(activeNote);
    res.json(notes);
})


app.listen(PORT, () => {
    console.log(`API server now on PORT ${PORT}`);
});