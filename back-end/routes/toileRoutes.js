var express = require('express');
var router = express.Router();
var ToileController = require('../controllers/ToileController')
const multerConfig = require('../middlewares/multer.config')
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.get('/',ToileController.list);

router.get('/:id', ToileController.show)

//post
router.post('/',multerConfig,ToileController.create)

//update
router.put('/:id', multerConfig ,ToileController.update)

//delete
router.delete('/:id',authAdmin,ToileController.remove)

module.exports = router;
