// Dependicies
const express = require('express');
const papa = require('papaparse')
const emailDB = require('../db/models/emailDB.js');
const router = express.Router();

// Get All Emails Route
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

// Remove An Email Route
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

// Add A New Email Route
router.post('/', (req, res) => {
    const newEmail = req.body;
    console.log(newEmail)
    return emailDB
        .insertEmail(newEmail)
        .then(email => {
            res.status(201).json(email)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not add email'
            })
        })
})

// Add CSV File Into Approved_Emails Table Route
router.post('/csv', (req, res) => {
    const file = req.body;
    const data = papa.unparse([file]);
    console.log(data)
    return emailDB
        .csvInsert({ data })
        .then(accepted => {
            res.status(202).json(accepted)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;