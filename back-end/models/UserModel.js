// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// un plugin de mongoose
const uniqueValidator = require('mongoose-unique-validator')
const toileModel = require('./ToileModel');
const product = toileModel.productSchema

//create a schema
const userSchema = new Schema({
    username : {type : String, required : false},
    nom : {type : String, required : false},
    prenom: {type : String, required : false},
    codePostal: {type : String, required : false},
    rue: {type : String, required : false},
    ville: {type : String, required : false},
    pays: {type : String, required : false},
    favoris : {type: [product], required : false},
    panier: {type: Array, required : false},
    'email' : {type: String, required: false, unique: true},
    'password' : {type: String, required: true},
    'avatar' : {type: String, required: false},
    'createdAt' : {type : Date, default : Date.now() }
});

userSchema.plugin(uniqueValidator)

// exporter le model de données
module.exports = mongoose.model('User', userSchema)