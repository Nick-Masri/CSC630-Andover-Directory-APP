var express = require("express");
var app = express();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pa_directory'
  }
});
var db = require("./app/db.js");

// Initialize Database
db.initialize(knex);
db.populate(knex);

app.get("/people", function(req, res){
  if("dorms" in req.query); //comma-separated list of dorms
  else if("clusters" in req.query); //comma-separated list of clusters
  else if("entered" in req.query); //comma-separated list of year entered
  else if("grades" in req.query); //comma-separated list of grades (Junior, ...)
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port " + (process.env.PORT || 3000));
});
