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

// Check If Email Is In The Accepted_Email Database
router.get('/is-accepted-email', (req, res) => {
    const checkEmail = req.body.email;
    console.log(checkEmail)

    return emailDB
        .getEmails()
        .then(email => {
            for (let i = 0; i < email.length; i++) {
                console.log(email[i].email)
                if (email[i].email.includes(checkEmail)) {
                    res.status(401).json({
                        message: {
                            topMessage: 'Account Not Allowed',
                            bottomMessage: 'You are not logged in or are attempting to access a board or discussion that this account is not authorized to see.  Please log in with your company email or contact your administrator.'
                        }
                    })
                } else {
                    res.status(200).json(email)
                }
            }
        })
        .catch(err => {
            res.status(500).json(err)
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
    // const fields = ['email', 'first_name', 'last_name']
    const data = papa.unparse([file]);
    // const newData = data.split('"');
    // const mappedData = newData.filter(data => {
    //     if (data !== '' && data !== undefined && data !== ',') {
    //         return data.split(',');
    //     }
    // })
    // console.log(data)
    return emailDB
        .csvInsert(data)
        .then(accepted => {
            console.log(accepted)
            res.status(202).json(accepted)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;