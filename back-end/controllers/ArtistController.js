const ArtistModel = require('../models/ArtistModel');



module.exports = {

  //get touts les artistes
  list: (req,res)=>{
    ArtistModel.find((err,artists)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'Error when getting artists'
        })
      }
      return res.status(200).json({
        status: 200,
        result: artists
      })
    })
  },

  //get une artist
  show: (req, res)=>{
    const id = req.params.id; // recupere id dans les paramteres de la requete
    ArtistModel.findOne({_id: id}, (err, artist)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: 'Error when getting un artist.'
            })
        }
        if(!artist){
            return res.status(404).json({
                status: 404,
                message: 'artist non trouver!'
            })
        }
        return res.status(200).json({
            status: 200,
            result: artist
        })
    })
  },
  

}