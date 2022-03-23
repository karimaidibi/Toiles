const RdvModel = require('../models/RdvModel');

module.exports = {

  //get tous les rdv
  list: (req,res)=>{
    RdvModel.find((err,rdvs)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'Error when getting rdvs'
        })
      }
      return res.status(200).json({
        status: 200,
        result: rdvs
      })
    })
  },

  //get une rdv
  show: (req, res)=>{
    const id = req.params.id; // recupere id dans les paramteres de la requete
    RdvModel.findOne({_id: id}, (err, rdv)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: 'Error when getting une rdv.'
            })
        }
        if(!rdv){
            return res.status(404).json({
                status: 404,
                message: 'rdv non trouver!'
            })
        }
        return res.status(200).json({
            status: 200,
            result: rdv
        })
    })
  },

  //créer une rdv 
  create: (req, res)=>{
  
    //recuperer le body de la requete
    const rdv = req.body; 
    console.log(rdv)
    delete rdv._id; // si ya un id dans la reponse json recu je le supprime (va etre regenere par mongodb)

    var Rdv = new RdvModel({
        ...rdv,
    })
    //console.log(rdv);
    // save la rdv dans mongodb
    Rdv.save((err, rdv)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: 'Error when creating rdv',
                error: err
            });
        }
        return res.status(201).json({
            status: 201,
            message: 'rdv Created'
        })
    })
  },

  remove: (req,res)=>{
    const id = req.params.id;
    RdvModel.findByIdAndRemove(id,(err,rdv)=>{
      if(err){
        return res.status(500).json({
            status: 500,
            message: 'Error when getting une rdv.'
        })
      }
      if(!rdv){
          return res.status(404).json({
              status: 404,
              message: 'rdv non trouver!'
          })
      }
      return res.status(204).json() 
    })
  }
  
}