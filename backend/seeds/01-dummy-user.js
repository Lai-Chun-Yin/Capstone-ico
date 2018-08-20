exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users").insert([
    {
      email: "ckc@ckc.com",
      alias: "ckc",
      photo: "",
      is_admin: false,
      pw: "123456",
      login_type: "local"
    },
    {
      email: "tom@tom.com",
      alias: "tom",
      photo: "",
      is_admin: false,
      pw: "123456",
      login_type: "local"
    }
  ]);
};
