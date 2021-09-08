const router = require('express').Router();
//import the controller
const UserController = require('../controllers/User');
//jwt validation
const { jwtValidation } = require('../config/jwtValidation');
//get routes
router.get('/users', jwtValidation, UserController.getUsers);
router.get('/users/:username', UserController.getUserByUsernane);

//post routes
router.post('/users/register', UserController.createUser);
router.post('/users/signin', UserController.signin);

module.exports = router;