
const apiUtilityFunctions = require('./apiUtilityFunctions');
const dbHelperFunctions = require('./dbHelperFunctions');


/** 
Sends an sendSMS request to an external SMS Service and saves the (Phone Number/NHS number) pair in the database if not already present. 

The "from" field in the SMS received by the patient is populated by the senderID field, which can be changed in the service configurations. From Firetext's API documentation:
The "Sender ID" ...  can be your company name or reply number. This field can only be alpha numeric. [A-Z], [a-z], [0-9], Min 3 chars, max 11 chars.

Precondition: 
The client sends a request with with following fields in the HTTP request body:
	 * Mobile Number (string)
	 * Message text (string)
	 * Nhs number (10 digit number)	 
*/

let sendSMS = function(req, res){
	let smsService = require('../configurations/smsServiceConfig');
	(async () => {
		let to = req.body.mobileNumber;
		let message = req.body.messageText;
		let nhsNumber = req.body.nhsNumber;

		let from = smsService.FIRETEXT.senderID;

		let data = {
			to,
			message,
			from
		}
		await Promise.all([dbHelperFunctions.saveMobileNumber({mobileNumber: to, nhsNumber}), apiUtilityFunctions.sendRequestToSmsService(data, smsService.FIRETEXT)])	
	})()
	.then(function(){
		apiUtilityFunctions.sendSuccess(res, "Success", {})
	})
	.catch(function(error){
		apiUtilityFunctions.sendError(res, 400, "Failed")
	})
	
}


/**
 * Returns a list of delivery receipts for the last month’s text messages. The returned data includes the patient’s nhs number that the text was sent to.

 * @param  {Express request object} req 
 * @param  {Express response object} res 
 * @return 
 1. If query is successful, Express response object with status code 200 an array of (deliveryReceipt documents) with the mobileNumber field populated with (mobileNumber, nhsNumber) pair , and "Success" messagge
 2. If query is not successful, express response object with status code 400 and "Failed" message
  
 */

let getDeliveryReceipts = function(req, res){
	(async () => {
		let messageData = await dbHelperFunctions.findReceipts();
		return messageData
	})()
	.then(function(data){
		apiUtilityFunctions.sendSuccess(res, "Success",  data)
	})
	.catch(function(error){
		console.log("ERROR: " + error);
		apiUtilityFunctions.sendError(res, 400,"Failed")
	})
}



/**
 * saves a delivery receipts received from an SMS provider and saves it to the database
 * @param  {mobile, status, time} req Expressrequest objecct
 * From Firetext API Documenation:
	The following are a list of parameters that will be sent via POST:
	mobile	The mobile number of the delivered message
	status	0: Delivered
			1: Declined
			2: Undelivered (Pending with Network)
	reference	Your custom reference returned, if set.
	time	The time the delivery report was received from the network (formatted as YYYY-MM-DD HH:MM:SS in British Summer Time (BST))

 * @param  {[type]} res [description]
  @return 
 	1. If query is successful, Express response object with status code 200 and "Success" message
 	2. If query is not successful, express response object with status code 400 and "Failed" message
 */
let saveDeliveryReceipt = function(req, res){

	(async () => {

		//converts the time from BST String to UTC Date Object 
		let timeInUTC = new Date(apiUtilityFunctions.bstToUtc(req.body.time));

		//fetches the foreign key corresponding to the given mobile number
		// let mobileNumber = await dbHelperFunctions.findMobileIdGivenNumber({mobileNumber: req.body.mobile})

		let data = {
			mobileNumber: req.body.mobile,
			status: req.body.status,
			deliveryTime: timeInUTC
		}
		await dbHelperFunctions.saveDeliveryReceipt(data);	
	})()
	.then(function(){
		apiUtilityFunctions.sendSuccess(res, "Success",  {})
	})
	.catch(function(error){
		console.log("ERROR:" + error);
		apiUtilityFunctions.sendError(res, 400, "Failed")
	})

}


module.exports = {
	sendSMS,
	getDeliveryReceipts,
	saveDeliveryReceipt
}
