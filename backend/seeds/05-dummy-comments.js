exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("comments").insert([
    { user_id: 1, content: "this will go to the moon", campaign_id: 1 },
    { user_id: 2, content: "this looks scammy", campaign_id: 1 }
  ]);
};
