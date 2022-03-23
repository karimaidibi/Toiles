var express = require('express');
var router = express.Router();
var RdvController = require('../controllers/RdvController')
var authAdmin = require('../middlewares/authAdmin')

// GET les rdv
router.get('/',authAdmin,RdvController.list);

//POST les rdv
router.post('/',RdvController.create)

//DELETE les rdv 
router.delete('/:id',authAdmin,RdvController.remove)

module.exports = router;
