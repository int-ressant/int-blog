const router = require('express').Router();
//import the controller
const CodeController = require('../controllers/Code');

//post routes
router.post('/codes/register', CodeController.sendCode);
router.post('/codes/confirmation', CodeController.confirmCode);
module.exports = router;