const mongoose = require('mongoose')

const DPreferenceSchema = new mongoose.Schema({
    interests:{
        type:String,
        required: true
    },
    image:{
        type:String,
    }
},{timestamps:true})

module.exports = new mongoose.model('DPreference', DPreferenceSchema)