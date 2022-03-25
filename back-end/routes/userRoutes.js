const UserController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const auth = require('../middlewares/auth');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/',authAdmin, UserController.list);

router.get('/:id',auth,UserController.show)

// Afficher les favoris de l'utilisateur en question
router.get('/:id/favoris',auth, UserController.showFavoris)

// Update les favoris de l'utilsateur en question
router.put('/:id/favoris',auth,UserController.updateOneUserFavoris)

// update le produit dans chaque liste de favoris dans laquelle ce produit existe  
router.put('/favoris',authAdmin,UserController.updateOneItemInAllFavoris)

// delete le produit dans chaque liste de favoris dans laquelle ce produit existe 
router.put('/favoris/delete',authAdmin,UserController.deleteOneItemInAllFavoris)

// Afficher les commandes de l'utilsateur en question
router.get('/:id/commandes',auth,UserController.showCommandes)

module.exports = router