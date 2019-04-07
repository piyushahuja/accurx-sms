const deliveryReceipts = require('../models/deliveryReceipts');
const mobileNumbers = require('../models/mobileNumbers');


/**
 * Searches whether a given mobileNumber is present in database. If not, adds a new (mobile number, nhs Number) pair. 
 * If the mobile number is already present, it updates the nhs Number to the new nhs number. (This can happen, if a phone number is transferred from one patient to another)

 * @param  String mobileNumber 
 * @param  Intger nhsNumber    10 digit NHS Number
 * @return a Promise which upserts the (mobileNumber, nhsNumber)
 * @throws {error} if the upsert fails
 */
let saveMobileNumber = ({mobileNumber, nhsNumber}) => {

    let criteria = {
      mobileNumber
    }
    let document = {
      mobileNumber, nhsNumber
    }

    return mobileNumbers.update(criteria, document, {upsert:true}).exec()
          .then((result) => {
              return JSON.parse(JSON.stringify(result));
          })
           .catch((error) => {
              throw error;
           });
}

/**
 * Saves a new delivery receipt. 
 * @param  {mobileNumber, status, deliveryTime} data: a JSON object sent by SMS service provider
 * @async returns an object that contains the status of the operation 
 * @throws {error} If not saved
 */
let saveDeliveryReceipt = (data) => {
    return deliveryReceipts.create(data) 
           .then((result) => {
            return JSON.parse(JSON.stringify(result));
            })
            .catch((error) => {
              console.error(error)
              throw error;
           });
}
    

/**
 * Fetches delivery receipts in the delivery receipts collection. 
 * The data goes through the following aggregation pipeline
 * - Receipts for the last 30 days are filtered
 * - NHS numbers corresponding to mobile numbers in the filtered recepts are looked up from the mobileNumbers collection
 * - the irrelevant fields in the resulting array of documents are discarded
 */

let findReceipts = function(queryParams){
    
  let pipeline = [

      {"$match": {   
          "deliveryTime": {
              $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
          }
        }
      },
      { 
        "$lookup": {
          "from": "mobilenumbers",
          "localField": "mobileNumber",
          "foreignField": "mobileNumber",
          "as": "mobileNumberList"
        }
      },
      {"$unwind": "$mobileNumberList"},
      {
        "$addFields" : {
          "nhsNumber" :"$mobileNumberList.nhsNumber",
          "mobileNumber": "$mobileNumberList.mobileNumber"
         
        }
      },
      {
        "$project": {
          "mobileNumber": 1,
          "nhsNumber": 1,
          "status": 1,
          "deliveryTime": 1
        }
      },
      {"$sort": {
          "deliveryTime": -1
        }
      }

  ]

  return deliveryReceipts.aggregate(pipeline).exec()
      .then((result) => {
            console.log("RESULT::" + JSON.stringify(result));
            return JSON.parse(JSON.stringify(result));
       })
      .catch((error) => {
            throw error;
      });
}




module.exports = {
  saveMobileNumber,
  saveDeliveryReceipt,
  findReceipts
  
}
