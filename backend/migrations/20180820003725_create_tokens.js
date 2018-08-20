exports.up = function(knex, Promise) {
  return knex.schema.createTable("tokens", table => {
    table.increments();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.string("type");
    table.boolean("distributed");
    table.string("name");
    table.string("symbol");
    table.integer("campaign_id").unsigned();
    table.string("token_contract");
    table.integer("total_supply").unsigned();
    table.integer("token_decimal_place").unsigned();
    table.string("receive_address");
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tokens');
};