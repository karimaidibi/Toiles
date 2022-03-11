const ToileModel = require('../models/ToileModel');
const fs = require('fs');
const { find } = require('../models/ToileModel');

module.exports = {

  //get toutes les toiles 
  list: (req,res)=>{
    ToileModel.find((err,toiles)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'Error when getting toiles'
        })
      }
      return res.status(200).json({
        status: 200,
        result: toiles
      })
    })
  },

  //get une toile
  show: (req, res)=>{
    const id = req.params.id;
    ToileModel.findOne({_id: id}, (err, toile)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: 'Error when getting une toile.'
            })
        }
        if(!toile){
            return res.status(404).json({
                status: 404,
                message: 'toile non trouver!'
            })
        }
        return res.status(200).json({
            status: 200,
            result: toile
        })
    })
  },

  //créer une toile 
  create: (req, res)=>{
    if(!req.file){
        return res.status(500).json({
            status: 500,
            message: 'toile Image Required'
        })
    }
    //recuperer le body de la requete 
    const toile = JSON.parse(req.body.toile);
    delete toile._id;

    var Toile = new ToileModel({
        ...toile,
         // redefinir le nom de limage en fx de la configuration faite en avance 
        image : `${req.protocol}://${req.get('host')}/images/toiles/${req.file.filename}`
    })
    console.log(toile);
    // save la toile dans mongodb
    Toile.save((err, Toile)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: 'Error when creating Toile',
                error: err
            });
        }
        return res.status(201).json({
            status: 201,
            message: 'Toile Created'
        })
    })
  },
}

// exports.list = (req,res)=>{
//     ToileModel.find()
//     .then((toiles)=>{
//       //res.status(200).json(toiles);
//       res.render('index',
//        { title: 'Toiles','toiles' : toiles });
//       console.log('get toiles success')
//     })
//     .catch((err)=>{
//       console.log('error on get toiles : ',err)
//       res.status(200).json(err)
//       throw err
//     })   
// }

// exports.show = (req,res)=>{
//     //console.log('get on toile : ',req.params.id)
//     ToileModel.findOne({_id: req.params.id})
//     .then((toile)=>{
//       res.render('detail',{'toile' : toile})
//     })
//     .catch((err)=>{
//       res.redirect('/')
//       console.log('error on get toile: ',err)
//     })
//   }

// exports.add = (req,res)=>{
//     res.render('add-toile');
// }

// exports.addOne = (req,res)=>{
//   // creation de la toile recu dans la requete 
//     let toile = new ToileModel({
//         ...req.body,
//         // redefinir le nom de limage en fx de la configuration faite en avance 
//         image: `${req.protocol}://${req.get('host')}/images/toiles/${req.file.filename}` 

//     });
//     console.log('la toile cree : ',toile)
//     // save la toile dans la bd 
//     toile.save((err,toile)=>{
//         if(err){
//             console.log('error on addOne',err)
//             res.render('add-toile', {err: err})
//         }else{
//             console.log('toile saved on db : ',toile)
//             res.render('add-toile', {success: 'toile bien ajouté ! '})         
//         }
//     })
//     // .then(()=>{
//     //     console.log('toile saved on db : ',toile)
//     //     res.render('add-toile', {success: 'toile bien ajouté ! '})
//     // })
//     // .catch((err)=>{
//     //     console.log('error on addOne',err)
//     //     res.render('add-toile', {err: err})
//     // })
// }