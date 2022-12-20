const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGODB_URI;
 mongoose.connect(mongoURI)




 const Schema = mongoose.Schema;
 
 
 const placeSchema = new Schema({
     title: { type: String, required: true },
     description: { type: String, required: true },
     image: { type: String, required: true },
     address: { type: String, required: true },
     location: {
         lat: { type: Number, required: true },
         lng: { type: Number, required: true },
     },
     creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
 });
 
 module.exports = mongoose.model('Place', placeSchema);