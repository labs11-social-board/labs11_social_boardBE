// Dependicies
const express = require('express');
const papa = require('papaparse')
const emailDB = require('../db/models/emailDB.js');
const router = express.Router();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  secureKey,
} = require('./../config/globals');

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

function authEmail (req, res, next) {
    const token = localStorage.getItem('symposium_token');

    if (token) {
        jwt.verify(token, secureKey, async (err, decoded) =>{
            if (err) {return res.status(403).json({err, message:'failed to email auth'})}
            else {
                req.decoded = decoded;
                let email = req.decoded.email;
                res.locals.email = email;
                next()
            }
        })
    }
}


// Check If Email Is In The Accepted_Email Database
router.get('/is-accepted-email', (req, res) => {
    const checkEmail = req.body.email;
    //const checkEmail = res.locals.email

    console.log(checkEmail)

    return emailDB
        .getEmails()
        .then(emails => {
            const pulledEmail = emails.filter(email => {
                if (email.email === checkEmail) {
                    return email.email
                }
            })

            if (pulledEmail.length !== 1) {
                res.status(401).json({
                    message: {
                        topMessage: 'Account Not Allowed',
                        bottomMessage: 'You are not logged in or are attempting to access a board or discussion that this account is not authorized to see.  Please log in with your company email or contact your administrator.'
                    }
                })
            } else {
                res.status(201).json(checkEmail)
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