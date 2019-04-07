const express = require('express');
const routeHandlers = require('../routeHandlers');
const smsServiceConfig = require('../configurations/smsServiceConfig');

let mountRoutes = (app) => {

	/**
	 * API end point to send a text message:
	 */
	app.post('/api/sendsms', routeHandlers.sendSMS );

	/**
	 * API end point to return a list of delivery receipts for the last month’s text messages.
	 */
	app.get('/api/receipts', routeHandlers.getDeliveryReceipts)

	/**
	 * API end point for Firetext to post back to.
	 */
	app.post(smsServiceConfig.FIRETEXT.nominatedUrl, routeHandlers.saveDeliveryReceipt)
}

module.exports = mountRoutes;