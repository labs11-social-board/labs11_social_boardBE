
exports.up = function (knex, Promise) {
    return knex.schema.createTable('approved_emails', function (tbl) {
        tbl.increments();

        tbl
            .string('email', 128)
            .notNullable()
            .unique();

        tbl
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('approved_emails');
};
