
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('approved_emails').del()
    .then(function () {
      // Inserts seed entries
      return knex('approved_emails').insert([
        {id: 1, email: 'amber@amberprograms.com', first_name: 'amber', last_name: 'meador', created_at: new Date.now()},
        {id: 2, email: 'huff@example.com', first_name: 'huff', last_name: 'king', created_at: new Date.now()},
        {id: 3, email: 'imonovbude@gmail.com', first_name: 'imon', last_name: 'imon', created_at: new Date.now()},
        {id: 4, email: 'trai@example.com', first_name: 'trai', last_name: 'trai', created_at: new Date.now()},
        {id: 5, email: 'modesto@example.com', first_name: 'modesto', last_name: 'modesto', created_at: new Date.now()},
        {id: 6, email: 'jonathan@example.com', first_name: 'jonathan', last_name: 'jonathan', created_at: new Date.now()},
        
      ]);
    });
};
