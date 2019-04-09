
const express = require('express');

require('dotenv').config();
const { google } = require('googleapis')

const router = express.Router();

const { getGData } = require('../../backend/db/models/AnalyticsG.js');


router.get('/', (req, res) => {
    return (
    res.status(201).json({getGData})
   
    // res.status(200).json({message: 'just keep swimming'})
    )
})

module.exports = router;

