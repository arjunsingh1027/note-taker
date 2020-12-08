const express = require("express");

const app = express();
const PORT = process.env.PORT || 3030;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, function () {
    console.log("app is listening on port:" +PORT);
})