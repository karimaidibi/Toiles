const UserController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/', UserController.list);

module.exports = router