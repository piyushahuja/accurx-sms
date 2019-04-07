const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const deliveryReceiptSchema = new Schema({
  mobileNumber: {type: Schema.Types.ObjectId, ref: 'MobileNumber'},
  status: { type: Number },
  deliverTime: {type: Date}
}, {
    timestamps: true
  });


let deliveryReceiptModel = Mongoose.model('DeliveryReceipts', deliveryReceiptSchema);

module.exports = deliveryReceiptModel;
