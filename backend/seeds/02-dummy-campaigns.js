exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("campaigns").insert([
    {
      title: "Killer Campaign",
      short_description: "Moon and Lambos",
      project_photo: "",
      long_description: "We will land on the moon with Lambos",
      full_name: "Boss",
      email: "max@max.com",
      company_name: "Some Weird Company",
      start_date: "2019-01-16 00:00:00+08",
      end_date: "2019-02-15 00:00:00+08",
      soft_cap: 50.5,
      hard_cap: 200.8,
      status: "pending",
      user_id: 1,
      token_id: 1
    },
    {
      title: "Dummy Campaign",
      short_description: "scam project",
      project_photo: "",
      long_description: "We will take your money and run away",
      full_name: "Scammer",
      email: "scammer@scammer.com",
      company_name: "Some Scammy Company",
      start_date: "2020-01-16 00:00:00+08",
      end_date: "2020-02-15 00:00:00+08",
      soft_cap: 100.5,
      hard_cap: 250.8,
      status: "pending",
      user_id: 2,
      token_id: 1
    }
  ]);
};
