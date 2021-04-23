//REQUIRE fs TO WRITE TO FILE
const fs = require("fs");
const path = require("path");
let notes = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

//ROUTING
module.exports = function (app) {
    //API GET Requests
    app.get("/api/notes", function (req, res) {
            res.json(notes);
    });

    //API POST Requests
    app.post("/api/notes", function (req, res) {
            var newData = req.body;
            newData.id = uuidv4();

            console.log("These are the notes", newData);

            notes.push(newData);

            console.log("The new note as been added!");

            fs.writeFileSync(path.join(__dirname, "../db/db.json"), 
            JSON.stringify(notes))
            res.json(notes);
          });

         //API DELETE Requests
         app.delete("/api/notes/:id", function (req, res) {
            var noteIdDelete = req.params.id;
            notes = notes.filter((note) => note.id != noteIdDelete);

            console.log("Note deleted! The notes are now:", noteIdDelete)
            
            res.json(notes);
          });
        }; 