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




// Check If Email Is In The Accepted_Email Database
router.get('/is-accepted-email', (req, res) => {
    const token = req.get('Email')
    let checkEmail = '';
    
    //console.log(req.headers.email);

    if (token) {
        
        jwt.verify(token, secureKey, async (err, decoded) =>{
            if(err) {
                return (
                    res.send(false)
                )
            }
            else {
                console.log('getting to ELSE!', decoded)
                req.decoded = decoded;
                checkEmail = req.decoded.email;

                return emailDB
                    .getEmails()
                    .then(emails => {
                        const emaily = emails.filter(email => email.email === `${checkEmail}`);

                        console.log(emaily);

                        if(emaily.length != 0) {
                            return (
                                res.send(true)
                            )
                        }
                        else {
                            return(
                                res.send(false)
                            )
                        }
                    })
                    .catch(err => {
                        res.status(501).json(err)
                    })
            }
        })
    } else {
        return res.send(false);
    }

    //console.log('check email:', checkEmail)
  
});


// Add A New Email Route
router.post('/', (req, res) => {
    const newEmail = req.body;
    console.log(newEmail)
    return emailDB
        .insertEmail(newEmail)
        .then(email => {

            res.status(201).json({
                message: 'Successfully added!'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not add an email'
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