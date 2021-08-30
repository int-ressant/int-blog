const router = require('express').Router();
const { jwtValidation } = require('../config/jwtValidation');
//import the controller
const PostController = require('../controllers/Post');

//get routes
router.get('/posts', PostController.getActivePosts);
router.get('/posts/all', jwtValidation, PostController.getAll);
router.post('/posts/register', jwtValidation, PostController.create);
router.put('/posts/:id/approve', jwtValidation, PostController.approvePost);

//delete routes

module.exports = router;