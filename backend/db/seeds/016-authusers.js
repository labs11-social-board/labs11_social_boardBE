
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('approved_emails').del()
    .then(function () {
      // Inserts seed entries
      return knex('approved_emails').insert([
        { email: 'amber@amberprograms.com', first_name: 'amber', last_name: 'meador', },
        { email: 'huff@example.com', first_name: 'huff', last_name: 'king', },
        { email: 'imonovbude@gmail.com', first_name: 'imon', last_name: 'imon', },
        { email: 'trai@example.com', first_name: 'trai', last_name: 'trai', },
        { email: 'modesto@example.com', first_name: 'modesto', last_name: 'modesto', },
        { email: 'jonathanjholloway@gmail.com', first_name: 'jonathan', last_name: 'jonathan', },
        { email: 'marcoguzman16@gmail.com', first_name: 'marco', last_name: 'guzman', },
        { email: 'itsmejeffery@gmail.com', first_name: 'jeffery', last_name: 'jeffery', },
        { email: 'kevintrandeveloper@gmail.com', first_name: 'kevin', last_name: 'jeffery', },
        { email: 'marco@example.com', first_name: 'marco2', last_name: 'guzman2', },
        { email: 'admin@adminsupahdemo.com', first_name: 'The Adminion', last_name: 'Of Adminions', },

      ]);
    });
};
