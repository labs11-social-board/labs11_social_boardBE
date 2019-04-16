
exports.up = function (knex, Promise) {
    return knex.schema.createTable('deleted_post', function (tbl) {
        tbl
            .increments()

        tbl
            .text('post', 2048)
            .notNullable();

        tbl
            .integer('post_id')
            .references('id')
            .inTable('posts')

        tbl
            .integer('user_id')
            .references('id')
            .inTable('users')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('deleted_post')
};
