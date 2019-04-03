
exports.up = function (knex, Promise) {
    return knex.schema.table('approved_emails', tbl => {
        tbl.string('first_name');
    });
};

exports.down = function (knex, Promise) {
    if (knex.schema.hasColumn('approved_emails', 'first_name')) {
        return knex.schema.table('approved_emails', tbl => {
            tbl.dropColumn('first_name');
        });
    }
};
