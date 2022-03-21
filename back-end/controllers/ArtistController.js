const ArtistModel = require('../models/ArtistModel');



module.exports = {

  //get touts les artistes
  list: (req,res)=>{
    ArtistModel.find((err,artists)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'Error when getting toiles'
        })
      }
      return res.status(200).json({
        status: 200,
        result: artists
      })
    })
  }

}