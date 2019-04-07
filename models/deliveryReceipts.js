const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const deliveryReceiptSchema = new Schema({
  mobileNumber: {type: String},
  status: { type: Number },
  deliveryTime: {type: Date}
}, {
    timestamps: true
  });


let deliveryReceiptModel = Mongoose.model('DeliveryReceipts', deliveryReceiptSchema);

module.exports = deliveryReceiptModel;
