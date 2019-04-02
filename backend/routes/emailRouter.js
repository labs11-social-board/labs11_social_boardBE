// Dependicies
const express = require('express');
const emailDB = require('../db/models/emailDB.js');
const router = express.Router();

// Get all emails route
router.get('/', (req, res) => {
    return emailDB
        .getEmails()
        .then(emails => {
            res.status(200).json(emails)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed retrieving emails'
            })
        })
});

// Remove an email 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    return emailDB
        .removeEmail(id)
        .then(deleted => {
            if (deleted !== 1) {
                res.status(404).json({
                    message: 'email not found'
                })
            } else {
                res.status(202).json(deleted)
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// Add a new email
router.post('/', (req, res) => {
    const email = req.body;
    return emailDB
        .insertEmail(email)
        .then(email => {
            res.status(201).json(email)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not add email'
            })
        })
})

module.exports = router;