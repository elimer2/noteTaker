const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function readDB() {
  const notes = fs.readFileSync(__dirname + "/db/db.json");
  const parsedNotes = JSON.parse(notes);
  return parsedNotes;
}

function writeDB(newNote) {
  const notes = readDB();
  notes.push(newNote);
  fs.writeFile(
    __dirname + "/db/db.json",
    JSON.stringify(notes, null, "\t"),
    () => {}
  );
}

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const notes = readDB();
  return res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  writeDB(newNote);
  res.json({
    status: "Success",
    message: "Note Saved",
  });
});

//Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
