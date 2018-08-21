exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.string('email');
    table.string('alias').notNullable();
    table.binary('photo');  // Binary Large Object (BLOB)
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