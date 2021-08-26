const router = require('express').Router();
//import the controller
const TagController = require('../controllers/Tag');

//get routes
router.post('/register', TagController.createTag);

module.exports = router;