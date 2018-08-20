
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("watchlists").del()
    .then(function() {
      return knex("comments").del()
        .then(function() {
          return knex("tokens").del()
            .then(function() {
              return knex("transactions").del()
                .then(function() {
                  return knex("campaigns").del()
                    .then(function() {
                      return knex("users").del()
                    })
                })
            })
        })
    })
};
