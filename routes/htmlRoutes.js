const path = require("path");

module.exports = function (app) {
    // return notes.html 
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    });

    // return index.html
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "..public/index.html"))
    });
};