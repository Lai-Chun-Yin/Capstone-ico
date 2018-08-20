exports.up = function(knex, Promise) {
  return knex.schema.table("comments", table => {
    table.integer("campaign_id").unsigned();
    table.foreign("campaign_id").references("campaigns.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("comments", table => {
    table.dropForeign("campaign_id");
    table.dropColumn("campaign_id");
  });
};