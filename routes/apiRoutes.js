const fs = require("fs");
const uuid = require("uuid");
const savedNotes = require("../db/db.json");

module.exports = function (app) {
    // get api/notes - reads db.json and returns saved notes as JSON
    app.get("/api/notes", function (req, res) {
        res.json(savedNotes);
    });

    // post api/notes - receive a new note, add it to db.json, return new note to user
    app.post("/api/notes", function (req, res) {
        // new note to save on the request
        const note = req.body
        // generate id for each new note
        note.id = uuid.v4();
        // add new note to savedNotes array
        savedNotes.push(note);
        // write note to db.json with updated savedNotes array
        fs.writeFile("./db/db.json", JSON.stringify(savedNotes))
        // display user created note
        res.json(note);
    });

    app.delete("/api/:id", function (req, res) {
        // query to find id of the note to delete
        const chosen = req.params.id;

        // read notes from db.json
        const oldNote = JSON.parse(fs.readFileSync("./db/db.json"));

        // remove note with targeted id
        const NewNote = JSON.stringify(oldNote.filter((savedNotes) => savedNotes.id !== chosen));

        // rewrite notes to db.json
        fs.writeFile("./db/db.json", JSON.stringify(NewNote));
    });
};