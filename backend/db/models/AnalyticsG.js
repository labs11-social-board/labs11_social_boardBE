require('dotenv').config();
const { google } = require('googleapis')

const express = require('express');
const router = express.Router();

const key = require('../../node_modules/Symposium-dc8cd0273c65.json');
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

const gjwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes, null)

const view_id = '193170741'


const getGData = async function getData() {
  const response = await gjwt.authorize()
  const result = await google.analytics('v3').data.ga.get({
    'auth': gjwt,
    'ids': 'ga:' + view_id,
    'start-date': '30daysAgo',
    'end-date': 'today',
    'metrics': 'ga:pageviews'
  })

  console.log(result)
  return result;
}

//getGData();






