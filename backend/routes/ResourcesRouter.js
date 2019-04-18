// DEPENDENCIES
const express = require('express');
const resourcesDB = require('../db/models/resourcesDB')
const router = express.Router();

// GET RESOURCES ROUTE
router.get('/', (req, res) => {
    return resourcesDB
    .getResources()
    .then(resources => {
        //console.log(resources)
        res.status(200).json(resources)
    })
    .catch(err => {
        res.status(500).json({error: 'There was a problem retrieving resources.'})
    })
})

// POST RESOURCES ROUTE
router.post('/insert-resources/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const {resource, title, info} = req.body;
    
    return resourcesDB
    .insertResource(user_id, resource, title, info )
    .then(resource => {
        if (!resource || !title || !info) {
            res.status(400).json({message: 'Missing resourse, title, or info.'})
            res.end()
        } else {
            res.status(202).json(resource)
        }
        
    })
    .catch(err => {
        res.status(500).json({error: 'There was a problem creating resource.'})
    })
})

router.delete('/delete-resources/:user_id', (req, res) => {
    const id = req.params.user_id;
    return resourcesDB
        .removeResource(id)
        .then(deleted => {
            if (deleted !== 1) {
                res.status(404).json({
                    message: 'message not found'
                })
            } else {
                res.status(202).json( {message: 'resource deleted'})
            }
        })
        .catch(err => {
            res.status(400).json({error: "There was a problem..."})
        })
})

module.exports = router;