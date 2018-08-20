exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("transactions").insert([
    {
      date: "2019-01-05 00:00:00+08",
      amount: 2.238,
      tx_hash: "blahblehblahhehah",
      user_id: 1,
      campaign_id: 1
    },
    {
      date: "2019-01-03 00:00:00+08",
      amount: 1.573,
      tx_hash: "caqejkdrtyuiophah",
      user_id: 2,
      campaign_id: 1
    }
  ]);
};
