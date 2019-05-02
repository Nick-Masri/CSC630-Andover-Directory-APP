var fs = require("fs");

module.exports = {
  /*
    Creates both tables in the database
  */
  initialize: function(knex){
    knex.schema.hasTable('users').then(function(exists){
      if(!exists) knex.schema.createTable('users', function(table){
        table.increments('id');
        table.string('email');
        table.string('password');
      })
      .then(function(){
        console.log("Successfully created 'users' table");
      });
    });

    knex.schema.hasTable('people').then(function(exists){
      if(!exists) knex.schema.createTable('people', function(table){
        table.increments('id');
        table.string('email');
        table.string('display_name');
        table.string('from');
        table.string('dorm');
        table.integer('entered');
        table.string('cluster');
        table.string('grade');
        table.string('search_body');
      })
      .then(function(){
        console.log("Successfully created 'people' table");
      });
    });
  },

  /*
    Automatically populates the 'people' database with all Andover students.
    Though this data is static (will never be updated/changed by users or admins), it is more convenient to have it in db form for filtering purposes.
  */
  populate: function(knex){
    knex.from("people")
      .select("id")
      .then(function(result){
        //Only populate if the database is empty
        if(!result.length){
          var rows = JSON.parse(fs.readFileSync("./backend/app/scraper/directory.json")).map(function(d){
            d.search_body = (d.display_name + " " + d.email + " " + d.from).toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); //Generate a search string for full text
            return d;
          });

          //Insert rows
          knex.batchInsert('people', rows)
            .then(function(){
              console.log("Successfully inserted rows");
            })
            .catch(function(e){
              console.log(e);
            });
        }
      });
  }
};
