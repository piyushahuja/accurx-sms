
const responseFlags = require('./responseFlags');
const constants = require('./constants');
const utilityFunctions = require('./utilityFunctions');
const dbHelperFunctions = require('./dbHelperFunctions');

/**
Sends a sendSMS request to an external SMS Service and saves the Phone Number/NHS number pair in the database if not already present.  The "from" field in the SMS received by the patient is populated by the SenderID, saved in the app constants (this can be changed.)

From Firtext's API documentation:
The "Sender ID" ...  can be your company name or reply number. This field can only be alpha numeric. [A-Z], [a-z], [0-9], Min 3 chars, max 11 chars.

Precondition: 
The client sends a request with with the following fields in the body:
	 * Mobile Number (string)
	 * Message text (string)
	 * Nhs number (10 digit number)	 
 */

let sendSMS = function(req, res){
	
	(async () => {
		console.log(JSON.stringify(req.body));
		let to = req.body.mobileNumber;
		let message = req.body.messageText;
		let nhsNumber = req.body.nhsNumber;

		let from = constants.SenderID;

		let data = {
			to,
			message,
			from
		}
		await dbHelperFunctions.saveMobileNumber({to, nhsNumber});
		await utilityFunctions.sendRequestToSmsService(data);
		

		let response = {
			flag: responseFlags.ACTION_SUCCESSFUL,
			message: 'Message Sent Successfully',
			data: {}
		};

		return response;

	})()
	.catch(function(error){
		console.error(error.message);

		let response = {
			flag: responseFlags.ACTION_FAILED,
			message: 'The message could not be delivered. Please try again.'
		};

		return response;
	})
	.then(function(response){
		console.log(JSON.stringify(response));
		return res.send(response);
	})
}


/**
 * One end point will simply return a list of delivery receipts for the last month’s text messages. The returned data from this endpoint is up to you but must include the patient’s nhs number that the text was sent to.
 */

let getDeliveryReceipts = function(req, res){
	(async () => {

		let messageData = await dbHelperFunctions.findMessages();

		let response = {
			flag: responseFlags.ACTION_SUCCESSFUL,
			message: 'Query successful',
			data: messageData
		};

		return response;

	})()
	.catch(function(error){
		console.error(error.message);
		let response = {
			flag: responseFlags.ACTION_FAILED,
			message: 'receipts could not be queried'
		};

		return response;
	})
	.then(function(response){
		console.log(JSON.stringify(response));
		return res.send(response);
	})
}


/**
 
From Firetext API Documenation:
The following are a list of parameters that will be sent via POST:

	Name	Description
	mobile	The mobile number of the delivered message
	status	0: Delivered
			1: Declined
			2: Undelivered (Pending with Network)
	reference	Your custom reference returned, if set.
	time	The time the delivery report was received from the network (formatted as 			YYYY-MM-DD 			HH:MM:SS)
 
*/

let saveDeliveryReceipt = function(req, res){

	(async () => {

		let data = {
			mobileNumber: req.params.mobile,
			status: req.params.status,
			deliveryTime: req.params.time
		}

		await dbHelperFunctions.saveDeliveryReceipt(data);	

	})()
	.catch(function(error){
		console.error(error.message);

	})
	.then(function(response){
		let response = {
			flag: responseFlags.ACTION_SUCCESSFUL,
			message: 'The delivery report received'
		};
		return res.send(response);
	})
}




		

module.exports = {
	sendSMS,
	getDeliveryReceipts,
	saveDeliveryReceipt
}
