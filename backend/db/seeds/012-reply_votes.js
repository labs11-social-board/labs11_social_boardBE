const {
  numOfReplyVotes,
  numOfReplies,
  numOfFakeUsers,
  getRandomIntInclusive
} = require('../../config/globals.js');

let possibleUserIDs = Array.from({ length: numOfFakeUsers }, (v, i) => i + 1);

const generateRandomUserId = () => {
  const randomIndex = getRandomIntInclusive(0, possibleUserIDs.length - 1);
  const randomID = possibleUserIDs.splice(randomIndex, 1);
  return randomID[0];
};

const generateSeeds = () => {
  let arr = [];
  for (let i = 1; i <= numOfReplyVotes; i++) {
    arr.push({
      reply_id: getRandomIntInclusive(1, numOfReplies),
      user_id: generateRandomUserId(),
      type: getRandomIntInclusive(0, 5) > 1 ? 1 : -1 // 2/3 chance of receiving an upvote
    });
  }
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reply_votes')
    .del()
    .then(function () {
      // Inserts seed entries
        return knex('reply_votes').insert(generateSeeds());
    });
};
