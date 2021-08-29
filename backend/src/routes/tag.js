const router = require('express').Router();
//import the controller
const TagController = require('../controllers/Tag');
const { jwtValidation } = require('../config/jwtValidation');

//get routes
router.get('/tags', TagController.getTags);
//post routes
router.post('/tags/register', jwtValidation, TagController.createTag);
//put routes
router.put('/tags/:id', jwtValidation, TagController.updateTag);
//delete routes

module.exports = router;