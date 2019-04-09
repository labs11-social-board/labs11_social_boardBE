
const express = require('express');

require('dotenv').config();
const { google } = require('googleapis')

const router = express.Router();

const { getGData } = require('../../backend/db/models/AnalyticsG.js');



router.get('/', async (req, res) => {
    let bob = await getGData;
    return (
    
    //res.send({ bob })
   
    res.status(200).json({message: 'just keep swimming'})
    )
})

module.exports = router;

