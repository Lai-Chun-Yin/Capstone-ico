exports.up = function(knex, Promise) {
  return knex.schema.table("watchlists", table => {
    table.foreign("campaign_id").references("campaigns.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("watchlists", table => {
    table.dropForeign("campaign_id");
  });
};