const express = require('express');
const routeHandlers = require('../routeHandlers')

let mountRoutes = (app) => {

	/**
	 * Three web end points on your web server. 
	 * One will take a json object with the following fields to send a text message:
	 * 		Mobile Number (string)
	 *  	Message text (string)
	 *  	Nhs number (10 digit number)
	 */
	app.post('/api/sendsms', routeHandlers.sendSMS );

	//One end point will simply return a list of delivery receipts for the last month’s text messages. The returned data from this endpoint is up to you but must include the patient’s nhs number that the text was sent to.

	//app.get('/api/receipts')

	/**
	 * The last will be your nominated url for Firetext to post back to.
	 * The following are a list of parameters that will be sent via POST:

			Name	Description
			mobile	The mobile number of the delivered message
			status	0: Delivered
					1: Declined
					2: Undelivered (Pending with Network)
			reference	Your custom reference returned, if set.
			time	The time the delivery report was received from the network (formatted as 			YYYY-MM-DD 			HH:MM:SS)
	 */
	//app.post('/api/webhook', )
}

module.exports = mountRoutes;