exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("tokens").insert([
    {
      user_id: 1,
      type: "",
      distributed: false,
      name: "Dummy Token",
      symbol: "DT",
      campaign_id: 1,
      token_contract: undefined,
      total_supply: 100000000,
      token_decimal_place: 18,
      receive_address: ""
    },
    {
      user_id: 2,
      type: "",
      distributed: false,
      name: "Test Token",
      symbol: "TT",
      campaign_id: 1,
      token_contract: undefined,
      total_supply: 100000000,
      token_decimal_place: 18,
      receive_address: ""
    }
  ]);
};
