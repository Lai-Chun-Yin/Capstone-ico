exports.up = function(knex, Promise) {
  return knex.schema.createTable('campaigns', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('short_description');
    table.string('project_photo');  // Can store path to AWS S3
    table.string('video_url');
    table.text('long_description');
    table.string('full_name');
    table.string('email');
    table.string('company_name');
    table.string('company_legal_form');
    table.string('company_reg_id');
    table.string('company_country');
    table.timestamp('start_date');
    table.timestamp('end_date');
    table.decimal('soft_cap');
    table.decimal('hard_cap');
    table.integer('total_supply');
    table.string('token_name');
    table.integer('decimal_places');
    table.string('token_symbol');
    table.decimal('conversion_ratio');
    table.string('status');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.string('eth_address');
    table.string('token_address');
    table.text('keystore');
    table.integer('token_id').unsigned();
    table.timestamps(false,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('campaigns');
};