// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const rdv = new Schema({
    date: {type : String, required : true},
    lieu : {type : String, required : true},
    nom : {type : String, required : true},
    prenom : {type : String, required : true},
    email : {type : String, required : true},
    telephone : {type : String, required : true},
    message: {type: String, required : false}
    
});

// exporter le model de données
module.exports = mongoose.model('Rdv', rdv)