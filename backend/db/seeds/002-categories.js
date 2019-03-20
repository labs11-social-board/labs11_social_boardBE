const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        {user_id: '1', name: 'Announcements', icon: 'fas fa-bullhorn', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)), // from 7 days ago
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 4)) // to 4 days ago
          )
        )},
        {user_id: '2', name: 'Dev Team', icon: 'fas fa-pager', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)), // from 7 days ago
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 4)) // to 4 days ago
          )
        )},
        {user_id: '3', name: 'Design Team', icon: 'fas fa-laptop', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)), // from 7 days ago
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 4)) // to 4 days ago
          )
        )},
        {user_id: '4', name: 'Marketing', icon: 'fas fa-chart-line', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)), // from 7 days ago
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 4)) // to 4 days ago
          )
        )},
        {user_id: '5', name: 'HR', icon: 'fas fa-male', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)), // from 7 days ago
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 4)) // to 4 days ago
          )
        )},
        {user_id: '6', name: 'Product Managers', icon: 'fas fa-comment', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)), // from 7 days ago
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 4)) // to 4 days ago
          )
        )},
        {user_id: '7', name: 'QA', icon: 'fas fa-cog', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)), // from 7 days ago
            new Date(Date.now() - (1000 * 60 * 60 * 24 * 4)) // to 4 days ago
          )
        )},
      ]);
    });
};
