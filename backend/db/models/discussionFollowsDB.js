const db = require('../dbConfig.js');

// checks to see if user_id is following discussion_id
const get = (discussion_id, user_id) => {
	return db('discussion_follows')
		.where({ user_id })
		.andWhere({ discussion_id });
};

const getFollowers = discussion_id => {
	return db('discussion_follows as cf')
		.select('cf.user_id', 'u.uuid')
		.join('users as u', 'u.id', 'cf.user_id')
		.where({ discussion_id });
};

// adds a follow for a certain discussion by a certain user
const add = (discussion_id, user_id) => {
	const addDiscussionFollow = db('discussion_follows')
	  .insert({ discussion_id, user_id });
	return Promise.all([ addDiscussionFollow ])
		.then(() => {
			return getDiscussionFollows = db('discussion_follows')
				.select('discussion_id')
				.where({ user_id });
		});
};

// remove a follow from a certin discussion by a certain user
const remove = (discussion_id, user_id) => {
	const removeDiscussion = db('discussion_follows')
		.where({ user_id })
		.andWhere({ discussion_id })
    .del();
  const getDiscussionFollows = db('discussion_follows')
    .select('discussion_id')
    .where({ user_id });
  return Promise.all([ removeDiscussion ])
    .then(() => {
      return Promise.all([ getDiscussionFollows ])
        .then(results => {
          let [ getDiscussionFollowsResults ] = results;
          getDiscussionFollowsResults = getDiscussionFollowsResults.map(follow => follow.discussion_id);
          return getDiscussionFollowsResults;
        });
    });
};

module.exports = {
	add,
	get,
	getFollowers,
	remove,
};