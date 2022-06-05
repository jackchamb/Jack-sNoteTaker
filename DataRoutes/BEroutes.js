// Requires for the routes to work:
const fs = require('fs');
const { parse } = require('path');
const util = require('util');
const app = require('express').Router();
const WriteFile = util.promisify(fs.writeFile);
const ReadFile = util.promisify(fs.readFile);
var NotesDB;
// Reads the notes.json file and stores it in the NotesDB variable
app.get('/notes'), (req, res) => {
    ReadFile('notes.json', 'utf8').then(function (data) {
        NotesDB = JSON.parse(data);
        res.JSON(NotesDB);
    });
};
// An app to create a new note
app.post('/notes'), (req, res) => {
    NotesDB.push(req.body);
    let NewFile = req.body;
    let CurrentNotes = NotesDB.length;

    NewFile.id = CurrentNotes + 1;
    NotesDB.push(NewFile);
    NotesDB = JSON.stringify(NotesDB);
    WriteFile('db/db.json', NotesDB, 'utf8').then(function () {
        console.log('File written successfully');
    });
    res.json(NotesDB);

};
// An app to delete a note
app.delete('/notes/:id'), (req, res) => {
    let Newid = parseInt(req.params.id);
    for (let i = 0; i < NotesDB.length; i++) {
        if (Newid === NotesDB[i].id) {
            NotesDB.splice(i, 1);
            let dataJSON = JSON.stringify(NotesDB, null, 2);
            WriteFile('db/db.json', dataJSON, 'utf8').then(function () {
                console.log('File written successfully');
            });
        }
    }
    res.json(NotesDB);
}

module.exports = app;


