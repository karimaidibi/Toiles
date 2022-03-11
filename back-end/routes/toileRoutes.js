var express = require('express');
var router = express.Router();
var ToileController = require('../controllers/ToileController')


router.get('/', ToileController.list);

router.get('/:id', ToileController.show)


module.exports = router;
