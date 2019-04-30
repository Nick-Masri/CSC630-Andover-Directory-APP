require('dotenv').config();
var express = require("express");
var app = express();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
});

require('knex-paginator')(knex);
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

      if("search" in req.query) queryBuilder.whereRaw("position('" + req.query.search + "' in display_name) > 0 OR position('" + req.query.search + "' in email) > 0 OR position('" + req.query.search + "' in \"from\") > 0"); //TODO: improve on names, make lower case ALSO SQL injection vulnerable here
    })
    .paginate(30, req.query.page ? parseInt(req.query.page) : 1)
    .then(function(results){
      res.json(results);
    })
    .catch(function(e){
      console.log(e);
      res.status(500);
      res.send("ERROR");
    });
});



////////// not protected ////////////
// Create Users
app.post("/users", function(req, res) {
  knex("users").insert({
    email: req.body['email'],
    password: bcrypt.hashSync(req.body['password'])
  }).then(function() {
    res.status(200).send("Succesfully Created Entry in Users Table");
  })
});


app.post("/users/auth", function(req, res) {
  // Authenticate and retrieve the access and refresh tokens in exchange of email/password
});


app.post("/users/auth/refresh", function(req, res) {
  // Authenticate and retrieve the access token in exchange of the refresh token.
});

//////////// protected /////////////
// Retrive a list of users
app.get("/users", function(req, res) {
  knex.select("*").from('users').then(
     res.status(200);
  )
});

app.post("/users/auth/revoke", function(req, res) {
  // Log out, revoke access by destroying the user tokens
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port " + (process.env.PORT || 3000));
});
