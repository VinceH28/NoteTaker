//REQUIRE fs TO WRITE TO FILE
var fs = require("fs");

//ROUTING
module.exports = function (app) {
    //API GET Requests
    app.get("/api/notes", function (req, res) {
        //The app has to read the database file located in ./db/db.json
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
        console.log('No data!');
        notes = [];
    } else {
        notes = JSON.parse(data);
    }
    console.log("These are the notes", notes);
    const inputNote = {
        id: Math.floor(Math.random() * 100),
        title: req.body.title,
        test: req.body.text,
    };
    notes.push(inputNote);
    
    console.log("The new note as been added!");

    fs.writeFileSync("./db/db.json", JSON.stringify(notes), "utf-8");
    res.json(inputNote);
     })
    });

    //Delete option
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);

            const filteredNotes = notes.filter(note => {
            return note.id != req.params.id
            });

            console.log("Note deleted! The notes are now:", filteredNotes)

            fs.writerFileSync("./db.db.json", JSON.stringify
            (filteredNotes), "utf-8");
            res.sendStatus(200);
        });
    });
};