const ContactController = require('../controllers/ContactController');
var express = require('express');
var router = express.Router();

//Envoyer un mail à l'administrateur du site
router.post('/', ContactController.sendMessage);

module.exports = router