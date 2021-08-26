const router = require('express').Router();
//import the controller
const UserController = require('../controllers/User');

//get routes
router.post('/register', UserController.createUser);
router.post('/confirmation', UserController.confirmCode);
router.post('/signin', UserController.signin);

module.exports = router;