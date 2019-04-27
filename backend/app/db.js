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
      })
      .then(function(){
        console.log("Successfully created 'people' table");
      });
    });
  }
};
