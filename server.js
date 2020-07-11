const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];

function readDB() {
  fs.readFile(__dirname + '/db/db.json', (err, data) => {
    notes = data;
  });
}

function writeDB() {
  fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes, null, '\t'), () => {});
}

readDB();

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get("/api/notes", (req, res) => {
//   return res.json(db.json); // ??????
// });
// app.post("/api/notes", function (req, res) {
//   res.send("POST request to the homepage");
//   console.log(req.body);
//   res.json(newCharacter); //????
// });

//Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
