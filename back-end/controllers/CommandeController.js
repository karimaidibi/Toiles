const CommandeModel = require('../models/CommandeModel');

module.exports = {

  //get tous les commande
  list: (req,res)=>{
    CommandeModel.find((err,commandes)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'Error when getting commandes'
        })
      }
      return res.status(200).json({
        status: 200,
        result: commandes
      })
    })
  },

  //get une commande
  show: (req, res)=>{
    const id = req.params.id; // recupere id dans les paramteres de la requete
    CommandeModel.findOne({_id: id}, (err, commande)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: 'Error when getting une commande.'
            })
        }
        if(!commande){
            return res.status(404).json({
                status: 404,
                message: 'commande non trouver!'
            })
        }
        return res.status(200).json({
            status: 200,
            result: commande
        })
    })
  },

  //créer une commande 
  create: (req, res)=>{
  
    //recuperer le body de la requete
    const commande = req.body; 
    console.log(commande)
    delete commande._id; // si ya un id dans la reponse json recu je le supprime (va etre regenere par mongodb)

    var Commande = new CommandeModel({
        ...commande,
    })
    //console.log(commande);
    // save la commande dans mongodb
    Commande.save((err, commande)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: 'Error when creating commande',
                error: err
            });
        }
        return res.status(201).json({
            status: 201,
            message: 'commande Created'
        })
    })
  },

  remove: (req,res)=>{
    const id = req.params.id;
    CommandeModel.findByIdAndRemove(id,(err,commande)=>{
      if(err){
        return res.status(500).json({
            status: 500,
            message: 'Error when getting une commande.'
        })
      }
      if(!commande){
          return res.status(404).json({
              status: 404,
              message: 'commande non trouver!'
          })
      }
      return res.status(204).json() 
    })
  }
  
}