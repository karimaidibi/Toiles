const ContactController = require('../controllers/ContactController');
var express = require('express');
var router = express.Router();

router.post('/', ContactController.sendMessage);

module.exports = router