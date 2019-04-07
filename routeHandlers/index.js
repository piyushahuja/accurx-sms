
const responseFlags = require('./responseFlags');
const constants = require('./constants');
const utilityFunctions = require('./utilityFunctions');
/**
 *This will take a json object with the following fields to send a text message:
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


		

module.exports = {
	sendSMS
}
