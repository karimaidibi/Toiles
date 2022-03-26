var express = require('express');
var router = express.Router();
var RdvController = require('../controllers/RdvController')
var authAdmin = require('../middlewares/authAdmin')
const auth = require('../middlewares/auth');

// GET la liste de tous les rdv
router.get('/',authAdmin,RdvController.list);

//POST un rdv en particulier
router.post('/',RdvController.create)

//DELETE un rdv en particulier
router.delete('/:id',authAdmin,RdvController.remove)

module.exports = router;
