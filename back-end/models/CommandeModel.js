// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const commande = new Schema({
    date: {type : Date, default: Date.now(), required : false},
    items: {type : Array, required : true},
    resume: {type : Object, required : true},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

// exporter le model de données
module.exports = mongoose.model('Commande', commande)