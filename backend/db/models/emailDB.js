const db = require('../dbConfig');


// Get all emails from the table
const getEmails = () => {
    return db('approved_emails')
};

// Add email to the table
const insertEmail = email => {
    return db('approved_emails')
        .insert(email)
}

// Add csv file to approved_emails database
const csvInsert = csv => {
    return db('approved_emails')
        .insert(csv)
}

// removeEmail from the table
const removeEmail = (id) => {
    return db('approved_emails')
        .where({ id })
        .del()
}

module.exports = {
    getEmails,
    insertEmail,
    removeEmail,
    csvInsert
}