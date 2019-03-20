const {
  getRandomUserId,
  numOfDiscussionVotes,
  numOfDiscussions,
  getRandomIntInclusive,
} = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  for (let i = 1; i <= numOfDiscussionVotes; i++) {
    arr.push({
      discussion_id: getRandomIntInclusive(1, numOfDiscussions),
      user_id: getRandomUserId(),
      type: getRandomIntInclusive(0, 5) > 1 ? 1 : -1, // 2/3 chance of receiving an upvote
    });
  }
  return arr;
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussion_votes').del()
    .then(function () {
      // Inserts seed entries
      return knex('discussion_votes').insert(generateSeeds());
    });
};
