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

// Routes
app.get("/people", function(req, res){
  knex.from("people")
    .select("*")
    .modify(function(queryBuilder){
      //Each field is a comma-separated list of values (i.e. clusters, dorms, etc.)

      if("dorms" in req.query) queryBuilder.whereIn('dorm', req.query.dorms.split(","));

      if("clusters" in req.query) queryBuilder.whereIn('cluster', req.query.clusters.split(","));

      if("entered" in req.query) queryBuilder.whereIn('entered', req.query.entered.split(",").map(function(d){
        return parseInt(d);
      }));

      if("grades" in req.query) queryBuilder.whereIn('grade', req.query.grades.split(","));
    })
    .then(function(results){
      res.json(results);
    })
    .catch(function(e){
      console.log(e);
      res.status(500);
      res.send("ERROR");
    });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port " + (process.env.PORT || 3000));
});
