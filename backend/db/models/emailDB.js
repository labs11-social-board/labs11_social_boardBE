const db = require('../dbConfig');

// Get all emails from the table
const getEmails = () => {
    return db('email_database')
};

// Add email to the table
const insertEmail = email => {
    return db('email_database')
        .insert(email)
}

// removeEmail from the table
const removeEmail = (id) => {
    return db('email_database')
        .where({ id })
        .del()
}

module.exports = {
    getEmails,
    insertEmail,
    removeEmail
}