const express = require('express');
const path = require('path');
const fs = require('fs');
// npm package to create unique IDs for new note objects
const uniqid = require('uniqid');
const notes = require('./db/db.json');
// process.env.PORT for the non-local Heroku version
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Sets up path to the CSS and JS
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the HTML routes for the homepage and notes page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Sets up GET for the API routes
// GET /api/notes reads the db.json file and returns all saved notes as JSON

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'UTF-8', (err, text) => {
        let currentNotes = JSON.parse(text);
        res.send(currentNotes);
    })
});

// Sets up POST for the API routes
// /api/notes receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client
// Using the Uniqid npm package to generate an id for the notes

app.post('/api/notes', (req, res) => {
    // get the existing notes
    fs.readFile('db/db.json', 'UTF-8', (err, text) => {
        let currentNotes = JSON.parse(text);
        // create the new note
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid()
        };
        // add the new note to db.json
        currentNotes.push(newNote);
        // overwrite old db.json with new version
        fs.writeFile('db/db.json', JSON.stringify(currentNotes), (err) => {
            if (err) throw err;
        })
    })
})


app.listen(PORT, () => {
    console.log(`API server now on PORT ${PORT}`);
});