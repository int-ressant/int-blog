const router = require('express').Router();
const { jwtValidation } = require('../config/jwtValidation');
//import the controller
const PostController = require('../controllers/Post');

//get routes
router.get('/posts', PostController.getActivePosts);
router.get('/posts/all', jwtValidation, PostController.getAll);
router.get('/posts/:slug/single', PostController.getBySlug);
router.post('/posts/:slug/view', PostController.addView);
router.post('/posts/register', jwtValidation, PostController.create);
router.put('/posts/admin/:id/edit', jwtValidation, PostController.adminActions);
router.put('/posts/:id/edit', jwtValidation, PostController.edit);

//delete routes

module.exports = router;