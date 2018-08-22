exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.string('email');
    table.string('alias').notNullable();
    table.string('photo'); //Can store path to AWS S3
    table.boolean('is_admin');
    table.string('pw');
    table.string('login_type');
    table.string("oauthid");
    table.timestamps(false,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};