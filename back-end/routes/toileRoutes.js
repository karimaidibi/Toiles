var express = require('express');
var router = express.Router();
var ToileController = require('../controllers/ToileController')
const multerConfig = require('../middlewares/multer.config')
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

// récuperer la liste de tous les produits
router.get('/',ToileController.list);

// recuperer un produit en particulier
router.get('/:id', ToileController.show)

//post un produit a la bd
router.post('/',authAdmin,multerConfig,ToileController.create)

//update un produit particulier
router.put('/:id',authAdmin,multerConfig ,ToileController.update)

//delete un produit en particulier
router.delete('/:id',authAdmin,ToileController.remove)

module.exports = router;
