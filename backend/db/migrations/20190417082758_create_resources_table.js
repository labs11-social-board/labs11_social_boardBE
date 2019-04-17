
exports.up = function (knex, Promise) {
    return knex.schema.createTable('resources', function (tbl) {
        tbl
            .increments()

        tbl
            .text('title', 500)
            .notNullable()

        tbl
            .text('resource', 2048)
            .notNullable()
            .unique()

        tbl
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('resources')
};
