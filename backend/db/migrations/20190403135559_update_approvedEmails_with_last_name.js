
exports.up = function (knex, Promise) {
    return knex.schema.table('approved_emails', tbl => {
        tbl.string('last_name')
    });
};

exports.down = function (knex, Promise) {
    if (knex.schema.hasColumn('approved_emails', 'last_name')) {
        return knex.schema.table('approved_emails', tbl => {
            tbl.dropColumn('last_name');
        });
    }
};