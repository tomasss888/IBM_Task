var express = require('express');
var router = express.Router();

//------------------// controller routes
const searchController = require('../controller/searchController.js'); 
router.get('/api/getGIF', searchController.search); 
router.get('/api/watson', searchController.watson); 

router.get('/api', (req, res) => {
    res.send('it works')
})

module.exports = router;