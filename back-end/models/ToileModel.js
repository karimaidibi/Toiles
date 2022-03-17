// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const product = new Schema({
    produit : {type : String, required : true},
    format : {type : String, required : true},
    type_produit : {type : String, required : true},
    prix: {type : Number, required : true},
    annee: {type : Number, required : false},
    stock: {type : Number, required : false},
    descriptif : {type : String, required : false},
    artistId: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    image: {type : String, required : false},




});

// exporter le model de données
module.exports = mongoose.model('Product', product)