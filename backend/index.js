require('dotenv').config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const passport = require('passport');
app.use(bodyParser.urlencoded({ extended: true }));

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
});

require('knex-paginator')(knex);
const db = require("./app/db.js");

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

/////////////// Authentication ///////////////

/*  PASSPORT SETUP  */
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

//* PASSPORT LOCAL AUTHENTICATION */
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
      knex("users").where("email", username).then(
        function(user, err) {
          user = user[0];
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          if (user.password != password) {
            return done(null, false);
          }
          return done(null, user);
      });
      }
));

// Authenticate Users
app.post('/authenticate', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.json({ error: 'Server Error', page:'LoginScreen'});
    }
    if (!user) {
      return res.json({ error: 'We do not have a user with that email and password combination', page:'LoginScreen'});
    }
    if (user) {
      return res.json({ page: 'HomeScreen' });
    }
  })(req, res, next);
});
// Create Users
app.post("/users", function(req, res) {
  knex("users").insert({
    email: req.body['email'],
    password: req.body['password']
  }).then(function() {
    return res.json({ page: 'LoginScreen'});
  })
});

// Run Server
app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port " + (process.env.PORT || 3000));
});
