// DEPENDENCIES
const express = require('express');
const resourcesDB = require('../db/models/resourcesDB')
const router = express.Router();

// GET RESOURCES ROUTE
router.get('/', (req, res) => {
    return resourcesDB
    .getResources()
    .then(resources => {
        console.log(resources)
        res.status(200).json(resources)
    })
    .catch(err => {
        res.status(500).json({error: 'There was a problem retrieving resources.'})
    })
})

// POST RESOURCES ROUTE
router.post('/insert-resources/:user_id', (req, res) => {
    const user_id = req.params.id;
    const {resource, title, info} = req.body;
    
    return resourcesDB
    .insertResource(user_id, resource, title, info )
    .then(resource => {
        res.status(202).json(resource)
    })
    .catch(err => {
        res.status(500).json({error: 'There was a problem creating resource.'})
    })
})

module.exports = router;