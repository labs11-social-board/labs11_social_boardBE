'use strict';
const express = require('express');

require('dotenv').config();
const { google } = require('googleapis')

const router = express.Router();

//const { getGData } = require('../../backend/db/models/AnalyticsG.js');

const key = require('../node_modules/Symposium-dc8cd0273c65.json');
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

const gjwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes, null)

const view_id = '193170741'

router.get('/', async (req, res) => {
    
    const response = await gjwt.authorize()
    const result = await google.analytics('v3').data.ga.get({
        'auth': gjwt,
        'ids': 'ga:' + view_id,
        'start-date': '30daysAgo',
        'end-date': 'today',
        'metrics': 'ga:pageviews'
    })
    
    .then(stuff =>{
        res.send(stuff)
    })
    .catch(e => {
        res.send(e)
    })

    // let bob = await getGData;
    // return (
    
    // //res.send({ bob })
   
    // res.status(200).json({message: 'just keep swimming'})
    // )
})

module.exports = router;

