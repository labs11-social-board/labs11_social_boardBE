
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('approved_emails').del()
    .then(function () {
      // Inserts seed entries
      return knex('approved_emails').insert([
        {id: 1, email: 'amber@amberprograms.com', first_name: 'amber', last_name: 'meador', },
        {id: 2, email: 'huff@example.com', first_name: 'huff', last_name: 'king', },
        {id: 3, email: 'imonovbude@gmail.com', first_name: 'imon', last_name: 'imon', },
        {id: 4, email: 'trai@example.com', first_name: 'trai', last_name: 'trai', },
        {id: 5, email: 'modesto@example.com', first_name: 'modesto', last_name: 'modesto', },
        {id: 6, email: 'jonathanjholloway@gmail.com', first_name: 'jonathan', last_name: 'jonathan', },
        {id: 7, email: 'marcoguzman16@gmail.com', first_name: 'marco', last_name: 'guzman', },
        {id: 8, email: 'itsmejeffery@gmail.com', first_name: 'jeffery', last_name: 'jeffery', },
        {id: 9, email: 'kevintrandeveloper@gmail.com', first_name: 'kevin', last_name: 'jeffery', },
        { id: 10, email: 'marco@example.com', first_name: 'marco', last_name: 'guzman', },
        
      ]);
    });
};
