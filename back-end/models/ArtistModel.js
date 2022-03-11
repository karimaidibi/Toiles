// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const artistSchema = new Schema({
    prenom : {type : String, required : true},
    nom : {type : String, required : true},
    
});

// exporter le model de données
module.exports = mongoose.model('Artist', artistSchema)