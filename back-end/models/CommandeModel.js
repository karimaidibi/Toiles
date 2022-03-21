// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const commande = new Schema({
    date: {type : Date, default: Date.now(), required : true},
    prix: {type : Number, required : true},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    toiles: {type : Array, required : false},
    lithographies: {type : Array, required : false},

});

// exporter le model de données
module.exports = mongoose.model('Commande', commande)