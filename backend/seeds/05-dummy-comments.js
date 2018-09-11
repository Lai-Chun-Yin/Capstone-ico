exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("comments").insert([
    { user_id: 1, content: "this will go to the moon", campaign_id: 1, date: '2018-01-05 00:21:08+08' },
    { user_id: 2, content: "this looks scammy", campaign_id: 1, date: '2018-09-11 04:05:03+08' }
  ]);
};
