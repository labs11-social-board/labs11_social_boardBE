const knex = require('knex');
const config = require('../knexfile.js');

const dbEngine = process.env.DB || 'development';

module.exports = knex(config[dbEngine]);
