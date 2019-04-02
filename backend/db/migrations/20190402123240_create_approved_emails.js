
exports.up = function(knex, Promise) {
    return knex.schema.createTable('approved_emails', tbl => {
        tbl.increments();

        tbl
            .string('email', 128)
            .notNullable()
            .unique()
            .onDelete('CASCADE');

        tbl
            .bigInteger('created_at')
            .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('approved_emails');
};
