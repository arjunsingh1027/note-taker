const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3030;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// api routes
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// post api/notes - receive a new note, add it to db.json, return new note to user
app.post("/api/notes", function (req, res) {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

// delete notes
app.delete("/api/notes/:id", function (req, res) {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
});

// html routes
// return notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// return index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});


// port listen
app.listen(PORT, function () {
    console.log("app is listening on port:" +PORT);
});