exports.up = function(knex, Promise) {
  return knex.schema.createTable('transactions', table => {
    table.increments();
    table.timestamp('date').notNullable();
    table.decimal('amount',20,9).notNullable();
    table.string('tx_hash').notNullable();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.integer("campaign_id").unsigned();
    table.foreign("campaign_id").references("campaigns.id");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transactions');
};