let deliveryReceipts = require('../models/deliveryReceipts');
let mobileNumbers = require('../models/mobileNumbers');




let saveMobileNumber = ({mobileNumber, nhsNumber}) => {

    return mobileNumbers.update({mobileNumber: mobileNumber}, {$set:nhsNumber}, {upsert:true}).exec()
          .then((result) => {
              console.log('RESULT ::: ', JSON.stringify(result));
              return JSON.parse(JSON.stringify(result));
          })
           .catch((error) => {
              console.log('ERROR ::: ', error.message);
              throw error;
           });
}

let saveDeliveryReceipt = (data) => {
    return deliveryReceipts.create(data) 
           .then((result) => {
            console.log('RESULT ::: ', JSON.stringify(result));
            return JSON.parse(JSON.stringify(result));
            })
            .catch((error) => {
              console.log('ERROR ::: ', error.message);
              throw error;
           });
}
    


let findMessages = function(){
      let options =  {
         "date": {
            $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
          },
        sort: {
          "deliverTime": -1
        }
      }

  return deliveryReceipts.find({}, {}, options).populate({
      path: 'mobileNumber',
      select: 'nhsNumber'
    }).exec()
      .then((result) => {
            console.log('RESULT ::: ', JSON.stringify(result));
            return JSON.parse(JSON.stringify(result));
       })
      .catch((error) => {
            console.log('ERROR ::: ', error.message);
            throw error;
        });
}






module.exports = {
  saveMobileNumber,
  saveDeliveryReceipt,
  findMessages
}
