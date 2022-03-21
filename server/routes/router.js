var express = require('express');
var router = express.Router();

//------------------// controller routes
const searchController = require('../controller/searchController.js'); 
router.get('/getGIF', searchController.search); 

router.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router;