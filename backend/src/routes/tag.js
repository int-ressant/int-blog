const router = require('express').Router();
//import the controller
const TagController = require('../controllers/Tag');

//get routes
router.get('/tags', TagController.getTags);
//post routes
router.post('/tags/register', TagController.createTag);
//put routes
router.put('/tags/:id', TagController.updateTag);
//delete routes

module.exports = router;