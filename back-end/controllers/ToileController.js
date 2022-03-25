const toileModel = require('../models/ToileModel');
const ToileModel = toileModel.productModel
const fs = require('fs');
const { find } = require('../models/ToileModel');
//module externe : require le nom du module externe qu'on vient 
// dinstaller avec npm 
const randomWords = require('random-words')

module.exports = {

  //get toutes les toiles 
  list: (req,res)=>{
    ToileModel.find((err,products)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'Error when getting toiles'
        })
      }
      //Ajouter un mot aleatoire au nom 
      products.forEach((product)=>{
        product.produit += ' ' + randomWords()
      })
      return res.status(200).json({
        status: 200,
        result: products
      })
    })
  },

  //get une toile
  show: (req, res)=>{
    const id = req.params.id; // recupere id dans les paramteres de la requete
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
    // tester si jai une image 
    if(!req.file){
        return res.status(500).json({
            status: 500,
            message: 'toile Image Required'
        })
    }
  
    //recuperer le body de la requete 
    const toile = JSON.parse(req.body.product); // transformer le json recu en objet javascript 
    delete toile._id; // si ya un id dans la reponse json recu je le supprime (va etre regenere par mongodb)

    var Toile = new ToileModel({
        ...toile,
         // redefinir le nom de limage en fx de la configuration faite en avance 
        image : `${req.protocol}://${req.get('host')}/images/toiles/${req.file.filename}`
    })
    //console.log(toile);
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

  //update une toile
  update: (req,res)=>{
    const id = req.params.id // recuperer id du produit
    let toile = JSON.parse(req.body.product) // recuperer lobjet 

    //traitement de l'image 
    if(req.file){ // si ya une image recu  
      toile.image = `${req.protocol}://${req.get('host')}/images/toiles/${req.file.filename}` //recuperer limage et changer son nom
      ToileModel.findOne({_id: id},{image: true},(err,toile)=>{
        if(err){
          console.log('error on find toile on update toile',err)
          throw err;
        }
        const oldFileName = toile.image.split('/toiles/')[1]; // recupere le nom de lancienne image afin de la supprimer
        const fileName = oldFileName.split('.')[0] // sans le format
        // supprimer seulement si cest une image avec un nom nombre
        if(typeof fileName === Number){
          fs.unlink(`public/images/toiles/${oldFileName}`, (err)=>{
            if(err){
              console.log(err.message)
            }
          }) 
        }
      })
    }
    //update la toile
    ToileModel.updateOne({_id: id},{...toile, _id: id}, (err,data)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'Erreur when updating toile'
        })
      }
      // si tout ce passe bien
      return res.status(200).json({
        status: 200,
        message: 'Objet updated success!'
      })
    })

  },

  remove: (req,res)=>{
    const id = req.params.id;
    ToileModel.findByIdAndRemove(id,(err,toile)=>{
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
      //traitement de l'image (supression)
      const oldFileName = toile.image.split('/toiles/')[1]; // recupere le nom de lancienne image afin de la supprimer
      const fileName = oldFileName.split('.')[0] // sans le format
      // supprimer seulement si cest une image avec un nom nombre
      if(typeof fileName === Number){
        fs.unlink(`public/images/toiles/${oldFileName}`, (err)=>{
          if(err){
            console.log(err.message)
          }
        }) 
      }
      return res.status(204).json() 
    })
  }
  
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