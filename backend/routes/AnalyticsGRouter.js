'use strict';
const express = require('express');

require('dotenv').config();
const { google } = require('googleapis')

const router = express.Router();

//const { getGData } = require('../../backend/db/models/AnalyticsG.js');

//const key = require('./app.json');
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

const gjwt = new google.auth.JWT(process.env.GCLIENT_EMAIL, null, process.env.GPRIVATE_KEY, scopes, null)

// the live pull endpoints begin with /analytics //

router.get('/pageviews', async (req, res) => {
    const view_id = '193170741'
    
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
        // res.status(200).json({message: 'just keep swimming'})
    })
    .catch(e => {
        res.send(e)
    })

    // let bob = await getGData;
    // return (
    
    // //res.send({ bob })
})

router.get('/users', async (req, res) => {
    const view_id = '193170741'
    
    const response = await gjwt.authorize()
    const result = await google.analytics('v3').data.ga.get({
        'auth': gjwt,
        'ids': 'ga:' + view_id,
        'start-date': '30daysAgo',
        'end-date': 'today',
        'metrics': 'ga:users'
    })
    
    .then(stuff =>{
        res.send(stuff)
    })
    .catch(e => {
        res.send(e)
    })

})



module.exports = router;

