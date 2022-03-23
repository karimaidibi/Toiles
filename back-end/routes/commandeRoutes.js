var express = require('express');
var router = express.Router();
var CommandeController = require('../controllers/CommandeController')

const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.get('/',authAdmin,CommandeController.list);

//post
router.post('/',auth,CommandeController.create)


module.exports = router;
