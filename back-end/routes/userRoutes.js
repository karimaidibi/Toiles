const UserController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const auth = require('../middlewares/auth');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/',authAdmin, UserController.list);

router.get('/:id/favoris',auth, UserController.showFavoris)

router.get('/:id',auth,UserController.show)

router.put('/:id/favoris',auth,UserController.updateOneUserFavoris)

router.put('/favoris',auth,UserController.updateOneItemInAllFavoris)

module.exports = router