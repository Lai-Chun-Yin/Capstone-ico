exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
    table.increments().primary();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.string('content').notNullable();
    table.timestamp('date').notNullable();
    table.timestamps(false,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};