const{
  numOfDefaultCategories,
} = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  // every user profile created for the team will be following default categories
  for (let i = 501; i <= 505; i++) {
    for (let j = 1; j <= numOfDefaultCategories; j++) {
      arr.push({ category_id: j, user_id: i });
    }
  }
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category_follows').del()
    .then(function () {
      // Inserts seed entries
      return knex('category_follows').insert(generateSeeds());
    });
};
