// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const artist = new Schema({
    prenom : {type : String, required : true},
    nom : {type : String, required : true},
    image: {type : String, required : false},
    descriptif: {type: String, required : false}
    
});

// exporter le model de données
module.exports = mongoose.model('Artist', artist)