const db = require('../dbConfig.js');

// globals
const { numOfDefaultCategories } = require('../../config/globals.js');

// checks to see if user_id is following category_id
const get = (category_id, user_id) => {
	return db('category_follows')
		.where({ user_id })
		.andWhere({ category_id });
};

const getFollowers = category_id => {
	return db('category_follows as cf')
		.select('cf.user_id', 'u.uuid')
		.join('users as u', 'u.id', 'cf.user_id')
		.where({ category_id });
};

// adds a follow for a certain category by a certain user
const add = (category_id, user_id) => {
	const addCategoryFollow = db('category_follows')
	  .insert({ category_id, user_id });
	return Promise.all([ addCategoryFollow ])
		.then(() => {
			return getCategoryFollows = db('category_follows')
				.select('category_id')
				.where({ user_id });
		});
};

const addDefaultCategoryFollows = user_id => {
	let categoryFollows = [];
	for (let i = 1; i <= numOfDefaultCategories; i++) {
		categoryFollows.push({ category_id: i, user_id });
	}
	return db('category_follows')
		.insert(categoryFollows);
};

// remove a follow from a certin category by a certain user
const remove = (category_id, user_id) => {
	const removeCategory = db('category_follows')
		.where({ user_id })
		.andWhere({ category_id })
    .del();
  const getCategoryFollows = db('category_follows')
    .select('category_id')
    .where({ user_id });
  return Promise.all([ removeCategory])
    .then(() => {
      return Promise.all([ getCategoryFollows ])
        .then(results => {
          let [ getCategoryFollowsResults ] = results;
          getCategoryFollowsResults = getCategoryFollowsResults.map(follow => follow.category_id);
          return getCategoryFollowsResults;
        });
    });
};

module.exports = {
	add,
	addDefaultCategoryFollows,
	get,
	getFollowers,
	remove,
};