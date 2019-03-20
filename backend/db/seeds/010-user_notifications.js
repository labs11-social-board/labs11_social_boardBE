exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_notifications').insert([
        {
          user_id: 502,
          category_id: 4,
          discussion_id: 17,
          created_at: Date.parse(new Date(Date.now())),
        },
        {
          user_id: 502,
          discussion_id: 17,
          post_id: 34,
          created_at: Date.parse(new Date(Date.now() - (1000 * 60 * 60 * 5))), // 5 hours ago
        },
      ]);
    });
};
