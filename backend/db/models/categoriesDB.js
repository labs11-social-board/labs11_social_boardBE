const db = require('../dbConfig.js');

//gets All Categories
const getCategories = async (order, orderType) => {
  const postsQuery = db('posts')
    .select('discussion_id')
    .count('id as post_count')
    .groupBy('discussion_id');

  const postCountQuery = db('discussions as d')
    .select('d.category_id')
    .sum('p.post_count as post_count')
    .join(postsQuery.as('p'), function() {
      this.on('p.discussion_id', '=', 'd.id');
    })
    .groupBy('d.category_id')
    .orderBy('d.category_id');

  const latestPostQuery = db.raw(`
    SELECT *
    FROM(
      SELECT	p.latest_post_discussion_id,
          p.latest_post_body,
          p.latest_post_created_at,
          d.category_id,
          ROW_NUMBER() OVER (PARTITION BY d.category_id ORDER BY p.latest_post_created_at DESC) AS row_id
      FROM discussions AS d
      JOIN(
        SELECT	latest_post_discussion_id,
            latest_post_body,
            latest_post_created_at
        FROM (
          SELECT	discussion_id AS latest_post_discussion_id,
              body AS latest_post_body,
              created_at AS latest_post_created_at,
              ROW_NUMBER() OVER (PARTITION BY discussion_id ORDER BY created_at DESC) AS row_id
          FROM posts
          ORDER BY created_at DESC
        ) toprows
        WHERE row_id = 1
        ORDER BY latest_post_discussion_id
      ) AS p ON p.latest_post_discussion_id = d.id
    ) toprows
    WHERE row_id = 1
  `);

  return db('categories as c')
    .select(
      'u.username as user_username',
      'c.name',
      'c.id',
      'c.icon',
      'c.user_id',
      'c.created_at',
      'pc.post_count',
      'lp.latest_post_discussion_id',
      'lp.latest_post_body',
      'lp.latest_post_created_at',
    )
    .count('d.id as discussion_count')
    .leftOuterJoin('users as u', 'u.id', 'c.user_id')
    .leftOuterJoin('discussions as d', 'd.category_id', 'c.id')
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.category_id', '=', 'c.id');
    })
    .joinRaw(`LEFT OUTER JOIN(${latestPostQuery}) AS lp ON lp.category_id = c.id`)
    .groupBy(
      'c.name',
      'c.id',
      'u.username',
      'pc.post_count',
      'lp.latest_post_discussion_id',
      'lp.latest_post_body',
      'lp.latest_post_created_at',
    )
    // order by given order and orderType
    // else default to ordering by name ascending
    .orderBy(`${order ? order : 'c.name'}`, `${orderType ? orderType : 'asc'}`);
};

const getFollowedCategoryNames = user_id => {
  const categoryFollowsQuery = db('category_follows')
    .select('category_id')
    .where({ user_id });

  return db('categories as c')
    .select('c.id', 'c.name', 'c.icon')
    .join(categoryFollowsQuery.as('cf'), function() {
      this.on('cf.category_id', '=', 'c.id');
    })
    .orderBy('c.name');
};

// get category by name
const getCategoryByName = name => {
  return db('categories')
    .select('name')
    .whereRaw('LOWER(name) = ?', name.toLowerCase())
    .first();
};

//Find By ID (categories own ID)
const findById = id => {
  return db('categories').where({ id });
};

//Add category into the categories table
const insert = category => {
  return db('categories').insert(category).returning('id');
};

const search = (searchText, order, orderType) => {
  return db('categories as c')
    .select('c.id', 'c.name', 'c.user_id', 'u.username', 'c.created_at', 'c.icon')
    .leftOuterJoin('users as u', 'u.id', 'c.user_id')
    .whereRaw('LOWER(c.name) LIKE ?', `%${searchText.toLowerCase()}%`)
    // order by given order and orderType, else default to ordering by created_at descending
    .orderBy(`${order ? order : 'c.created_at'}`, `${orderType ? orderType : 'desc'}`);
};

module.exports = {
  getCategories,
  getCategoryByName,
  getFollowedCategoryNames,
  findById,
  search,
  insert,
};
