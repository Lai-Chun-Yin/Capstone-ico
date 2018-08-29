exports.up = function(knex, Promise) {
  return knex.schema.createTable("watchlists", table => {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer("campaign_id").unsigned(); 
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('watchlists');
};