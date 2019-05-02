require('dotenv').config();

const express = require("express");
const app = express();

const passport = require('passport');

// Body Parser Setup
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Knex Setup
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
});
require('knex-paginator')(knex);
const db = require("./app/db.js");

// Encryption
const bcrypt = require("bcrypt-nodejs");

// Initialize Database
db.initialize(knex);
db.populate(knex);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password, done) {
  knex("users").where("email", username).then(function(user, err) {
    user = user[0];
    if(err) return done(err);

    if(!user) return done(null, false); // If nothing found
    if (!bcrypt.compareSync(password, user.password)) return done(null, false); // If passport incorrect

    return done(null, user); //Otherwise, authenticate
  });
}));

//////// ROUTES ////////

// API (Gets all people, filterable)
app.get("/people", function(req, res){
  knex.from("people")
    .select("*")
    .modify(function(queryBuilder){
      if("search" in req.query) queryBuilder.where('search_body', 'like', '%' + req.query.search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() + '%');

      //Each field is a comma-separated list of values (i.e. clusters, dorms, etc.)
      if("dorms" in req.query) queryBuilder.whereIn('dorm', req.query.dorms.split(","));

      if("clusters" in req.query) queryBuilder.whereIn('cluster', req.query.clusters.split(","));

      if("entered" in req.query) queryBuilder.whereIn('entered', req.query.entered.split(",").map(function(d){
        return parseInt(d);
      }));

      if("grades" in req.query) queryBuilder.whereIn('grade', req.query.grades.split(","));
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
          if (!bcrypt.compareSync(user.password, password)) {
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
    if (err) return res.json({ error: 'Server Error', page: 'LoginScreen'});

    if (!user) return res.json({ error: 'We do not have a user with that email and password combination', page:'LoginScreen'});

    console.log(user);
    return res.json({ page: 'HomeScreen' });
  })(req, res, next);
});

// Create Users
app.post("/users", function(req, res) {
  knex("select").select().where("username", req.body['email']).then((response) => {
    if (!response.length){ // Check if the username doesn't already exist
      knex("users").insert({
        email: req.body['email'],
        password: bcrypt.hashSync(req.body['password'])
      }).then(function() {
        return res.json({ page: 'LoginScreen'});
      })
    } else {
      return res.json({ page: 'SignUpScreen', error: 'That username is already taken'});
    }
  })

});

// Run Server
app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port " + (process.env.PORT || 3000));
});
