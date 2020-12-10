const fs = require("fs");
const uuid = require("uuid");
const savedNotes = require("../db/db.json");

module.exports = function (app) {
    // get api/notes - reads db.json and returns saved notes as JSON
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "/db/db.json"))
    });

    // post api/notes - receive a new note, add it to db.json, return new note to user
    app.post("/api/notes", function (req, res) {
        const notes = JSON.parse(fs.readFileSync(".db/db.json"));
        const newNotes = req.body;
        newNotes.id = uuid.v4();
        notes.push(newNotes);
        fs.writeFileSync("./db/db.json", JSON.stringify(notes))
        res.json(notes);
    });

    app.delete("/api/notes/:id", function (req, res) {
        const notes = JSON.parse(fs.readFileSync("./db/db.json"));
        const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
        fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
        res.json(deleteNote);
    });
};