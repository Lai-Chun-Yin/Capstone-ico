exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("watchlists").insert([
    { user_id: 1, campaign_id: 1 },
    { user_id: 2, campaign_id: 1 }
  ]);
};
