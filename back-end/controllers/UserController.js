const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CommandeModel = require('../models/CommandeModel')

module.exports = {

    signup: (req, res)=>{
        bcrypt.hash(req.body.password, 10, (err,hash)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: err.message
                })
            }
            //create user 
            const newUser = new UserModel({
                email: req.body.email,
                password: hash
            })
            //save
            newUser.save((err,user)=>{
                if(err){
                    return res.status(400).json({
                        status: 400,
                        message: err.message
                    })  
                }
                return res.status(201).json({
                    status: 201,
                    message: 'User created succesfully'
                })
            })
        })
    },

    login: (req, res)=>{
        //chercher lutilisateur en question
        UserModel.findOne({email: req.body.email}, (err, user)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }
            if(!user){
                return res.status(404).json({
                    status: 404,
                    message: 'utilisateur NOT found'
                });           
            }
            // si pas derreur, verifier le mot de passe de lutilisateur
            // comparer le pass recu avec le pass de user dans la bd
            bcrypt.compare(req.body.password, user.password, (err,valide)=>{
                if(err){
                    return res.status(500).json({
                        status: 500,
                        message: err.message
                    });
                }
                if(!valide){
                    return res.status(401).json({
                        status: 401,
                        message: "password pas bon !"
                    });         
                }
                // si tout se passe bien
                // verifier si cest admin
                if(user._id == process.env.ADMIN_ID){
                    console.log('Admin logged in')
                    return res.status(200).json({
                        userId: user._id,
                        // generer un token avec le package json web token
                        token: jwt.sign(
                            {userId: user._id,
                            userStatus : 1 },
                            process.env.TOKEN_SECRET, // grace a cette cle ca va encoder le token et on a besoin de ca pour decoder le token 
                            {expiresIn: '24h'} // dure pour une journe
                        )
    
                    })           
                }else{
                    console.log('client logged in')
                    return res.status(200).json({
                        userId: user._id,
                        // generer un token avec le package json web token
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.TOKEN_SECRET, // grace a cette cle ca va encoder le token et on a besoin de ca pour decoder le token 
                            {expiresIn: '24h'} // dure pour une journe
                        )
    
                    })
                }
            })
        })
    },

    list: (req, res)=>{
        UserModel.find((err, users)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: 'Error when getting users'
                })               
            }
            return res.status(200).json({
                status: 200,
                result: users
            })
        })
    },

    //get un user
    show: (req, res)=>{
        const id = req.params.id; // recupere id dans les paramteres de la requete
        UserModel.findOne({_id: id}, (err, user)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: 'Error when getting one user.'
                })
            }
            if(!user){
                return res.status(404).json({
                    status: 404,
                    message: 'user non trouver!'
                })
            }
            return res.status(200).json({
                status: 200,
                result: user
            })
        })
    },

    // Afficher les favoris de l'utilisateur en question
    showFavoris: (req, res)=>{
        const id = req.params.id; // recupere id dans les paramteres de la requete
        UserModel.findOne({_id: id},{favoris: true}, (err, user)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: 'Error when getting one user favoris.'
                })
            }
            if(!user){
                return res.status(404).json({
                    status: 404,
                    message: 'user non trouver!'
                })
            }
            return res.status(200).json({
                status: 200,
                result: user
            })
        })
    },

    // Update les favoris de l'utilsateur en question
    updateOneUserFavoris: (req,res)=>{
        const id = req.params.id; // recupere id dans les paramteres de la requete
        const products = req.body.products // recuperer lobjet favoris

        //update l'objet favoris de cet utilisateur
        UserModel.updateOne({_id: id},{$set:{favoris : products}}, (err,data)=>{
            if(err){
                return res.status(500).json({
                status: 500,
                message: 'Erreur when updating favoris'
                })
            }
            // si tout ce passe bien
            return res.status(200).json({
                status: 200,
                message: 'Objet updated success!'
            })
        })

    },

    // update le produit dans chaque liste de favoris dans laquelle ce produit existe  
    updateOneItemInAllFavoris: (req,res)=>{
        console.log(req.body)
        const product = req.body.product // recuperer lobjet favoris

        //match all items with this id and update items with the new one 
        UserModel.updateMany({},
            {$set : {"favoris.$[product]" : product}},
            {arrayFilters : [{ "product._id" : product._id}]}, (err,data)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                    status: 500,
                    message: 'Erreur when updating favoris'
                    })
                }
                // si tout ce passe bien
                return res.status(200).json({
                    status: 200,
                    message: 'Objet updated success!'
                })
            })

    },

    // delete le produit dans chaque liste de favoris dans laquelle ce produit existe 
    deleteOneItemInAllFavoris: (req,res)=>{
        const productId = req.body.productId // recuperer lobjet favoris

        //match all items with this id and delete it
        UserModel.updateMany(
            {}, 
            { $pull: { favoris: { _id: productId} } } , (err,data)=>{
                if(err){
                    return res.status(500).json({
                    status: 500,
                    message: 'Erreur when updating favoris'
                    })
                }
                // si tout ce passe bien
                return res.status(200).json({
                    status: 200,
                    message: 'Objet updated success!'
                })
            })
    },

    // Récupérer les commandes de l'utilisateur en question
    showCommandes: (req, res)=>{
        const id = req.params.id; // recupere id dans les paramteres de la requete
        CommandeModel.find({userId: id}, (err, commandes)=>{
            if(err){
                return res.status(500).json({
                    status: 500,
                    message: 'Error when getting one user commandes.'
                })
            }
            if(!commandes){
                return res.status(404).json({
                    status: 404,
                    message: 'commandes non trouver pour cet utilisateur!'
                })
            }
            return res.status(200).json({
                status: 200,
                result: commandes
            })
        })
    },



}