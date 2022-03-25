var express = require('express');
var router = express.Router();
var CommandeController = require('../controllers/CommandeController')

const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

// Récupérer la liste de toutes les commandes dans la base de données
router.get('/',authAdmin,CommandeController.list);

// Ajouter une commande à la collection des commandes dans la base de données
router.post('/',auth,CommandeController.create)

// Récuperer la commande en question
router.get('/:id', auth, CommandeController.show)

module.exports = router;
