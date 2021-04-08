// DEPENDENCIES
var path = require("path");

// ROUTING

module.exports = function (app) {
  // HTML GET Requests
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  //Default home when no matching route found
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });  
};