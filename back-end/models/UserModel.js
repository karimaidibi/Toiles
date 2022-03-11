// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const userSchema = new Schema({
    username : {type : String, required : true},
    nom : {type : String, required : true},
    prenom: {type : String, required : true},
    codePostal: {type : String, required : true},
    rue: {type : String, required : true},
    ville: {type : String, required : true},
    pays: {type : String, required : true},
    favoris : Array,
    panier: Array,
    'email' : {type: String, required: true, unique: true},
    'password' : {type: String, required: true},
    'avatar' : {type: String, required: false},
    'createdAt' : {type : Date, default : Date.now() }
});

// exporter le model de données
module.exports = mongoose.model('User', userSchema)