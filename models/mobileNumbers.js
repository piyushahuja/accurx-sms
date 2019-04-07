const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const mobileNumberSchema = new Schema({
  mobileNumber: { type: String, index: true, unique: true, sparse: true },
  nhsNumber: { type: Number }
}, {
    timestamps: true
  });


let mobileNumberModel = Mongoose.model('MobileNumber', mobileNumberSchema);

module.exports = mobileNumberModel;
