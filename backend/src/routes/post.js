const router = require('express').Router();
const { jwtValidation } = require('../config/jwtValidation');
//import the controller
const PostController = require('../controllers/Post');

//get routes
router.post('/posts/register', jwtValidation, PostController.create);

//delete routes

module.exports = router;