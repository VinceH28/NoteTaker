//REQUIRE fs TO WRITE TO FILE
const fs = require("fs");

//ROUTING
module.exports = function (app) {
    //API GET Requests
    app.get("/api/notes", function (req, res) {
      console.log("get route hit");
      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (!data) {
          return (data = []);
        }
        if (err) throw err;
        let notes = JSON.parse(data);
        res.json(notes);
      });
    });

    //API POST Requests
    app.post("/api/notes", function (req, res) {
      fs.readFile("./db/db.json", "utf8", (err, data) => {
        let notes = [];
      if (err) throw err;
      if (!data) {
        console.log("No data!");
        notes = [];
      } else {
                notes = JSON.parse(data);
      }
            console.log("These are the notes", notes);

            const newNote = {
              id: Math.floor(Math.random() * 100),
              title: req.body.title,
              text: req.body.text,
      };
        notes.push(newNote);
        
        console.log("The new note as been added!");
        fs.writeFileSync("./db/db.json", JSON.stringify(notes), "utf-8");
        res.json(newNote);
      });
    });

         //API DELETE Requests
         app.delete("/api/notes/:id", function (req, res) {
          fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
      
            const filteredNotes = notes.filter(note => {
            return note.id != req.params.id
            });
      
            console.log("Note deleted! The notes are now:", filteredNotes)
      
            fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes), "utf-8");

            res.sendStatus(200);
      
          });
        });
      };
     