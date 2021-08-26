const router = require('express').Router();
//import the controller
const UserController = require('../controllers/User');

//get routes
router.post('/users/register', UserController.createUser);
router.post('/users/confirmation', UserController.confirmCode);
router.post('/users/signin', UserController.signin);

module.exports = router;