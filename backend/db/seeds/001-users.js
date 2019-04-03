// External API containing mock data for various endpoints
const faker = require('faker');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const { numOfFakeUsers, numOfHashes } = require('../../config/globals.js');

// For loop to generate numOfFakeUsers
const generateSeeds = () => {
  let arr = [];
  // prettier-ignore
  for (let i = 0; i < numOfFakeUsers; i++) {
    arr.push({
      username: faker.internet.userName(),
      password: 'pass',
      email: faker.internet.email(),
      status: 'active',
      uuid: i + 1, // fake uuid to never be used since you cant login with fake users,
      last_login: Date.now(),
      created_at: Date.parse(
        faker.date.between(
          new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
          new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
        )
      )
    });
  }

  // our test accounts (owners) for authentication/authorization
  // prettier-ignore
  arr.push({
    username: 'james',
    password: bcrypt.hashSync('pass1', numOfHashes),
    email: 'james@example.com',
    status: 'active',
    uuid: uuidv4(),
    bio: 'My name is james and im a pretty cool dude',
    github: 'https://github.com/labs11-social-board',
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    ),
  });
  // prettier-ignore
  arr.push({
    username: 'carlos',
    password: bcrypt.hashSync('carlos', numOfHashes),
    email: 'carlos@example.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'david',
    password: bcrypt.hashSync('david', numOfHashes),
    email: 'david@example.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'huff',
    password: bcrypt.hashSync('huff', numOfHashes),
    email: 'huff@example.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'lucas',
    password: bcrypt.hashSync('lucas', numOfHashes),
    email: 'lucas@example.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'amber',
    password: bcrypt.hashSync('amber', numOfHashes),
    email: 'amber@amberprograms.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'imon',
    password: bcrypt.hashSync('imon', numOfHashes),
    email: 'imonovbude@gmail.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'abdul',
    password: bcrypt.hashSync('abdul', numOfHashes),
    email: 'abdulfatah.a.ahmad@gmx.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'lavon',
    password: bcrypt.hashSync('lavon', numOfHashes),
    email: 'micah.shrak@gmail.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'brandon',
    password: bcrypt.hashSync('brandon', numOfHashes),
    email: 'brandon@example.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });
  // prettier-ignore
  arr.push({
    username: 'trai',
    password: bcrypt.hashSync('trai', numOfHashes),
    email: 'trai@example.com',
    status: 'active',
    uuid: uuidv4(),
    last_login: Date.now(),
    created_at: Date.parse(
      faker.date.between(
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)), // from 10 days ago
        new Date(Date.now() - (1000 * 60 * 60 * 24 * 8)) // to 8 days ago
      )
    )
  });

  


  return arr;
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries for users table
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert(generateSeeds());
    });
};
