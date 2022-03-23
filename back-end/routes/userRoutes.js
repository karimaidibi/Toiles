const UserController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();
const authAdmin = require('../middlewares/authAdmin');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/',authAdmin, UserController.list);

module.exports = router