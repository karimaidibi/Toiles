var express = require('express');
var router = express.Router();
var ArtistController = require('../controllers/ArtistController')
const multerConfig = require('../middlewares/multer.config')
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

// récuperer la listes de tous les artistes dans la bd
router.get('/',ArtistController.list);

// récuperer un artiste en particulier
router.get('/:id', ArtistController.show)

//post
//router.post('/',authAdmin,multerConfig,ArtistController.create)

//update
//router.put('/:id',authAdmin,multerConfig ,ArtistController.update)

//delete
//router.delete('/:id',authAdmin,ArtistController.remove)

module.exports = router;
