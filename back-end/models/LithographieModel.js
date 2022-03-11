// import package mongoose for mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const lithographieSchema = new Schema({
    nom : {type : String, required : true},
    format : {type : Array, required : true},
    prix: {type : Number, required : true},
    image: {type : String, required : true},
    dateCreation: {type : Date, default: Date.now(), required : true},
    description : {type : String, required : true},
    stock: {type : Array, required : true},
    artistId: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }

});

// exporter le model de données
module.exports = mongoose.model('Lithographie', lithographieSchema)