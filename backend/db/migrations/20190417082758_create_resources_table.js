
exports.up = function (knex, Promise) {
    return knex.schema.createTable('resources', function (tbl) {
        tbl
            .increments()

        tbl
            .text('title', 500)
            .notNullable()
            .onDelete('CASCADE')

        tbl
            .text('resource', 2048)
            .notNullable()
            .unique()
            .onDelete('CASCADE')

        tbl
            .text('info', 2048)
            .notNullable()
            .onDelete('CASCADE')

        tbl
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('resources')
};
