const requestPromise = require('request-promise');
const momentTimezone = require('moment-timezone');


/**
 * helper method to form a proper HTTP response (with status code) to incoming HTTP requests
 * @param  {Express Response object} res 
 * @param  {String} message Message indicating success
 * @param  {JSON} data   any data queried 
 * @return {Express Response object}  res  HTTP response with status code 200 and response body.
 */
function sendSuccess(res, message,data){
    var response = {
        message: message,
        data: data
    };
    res.status(200).json(response);
}


/**
 * helper method to form a proper HTTP response (with status code) to incoming HTTP requests
 * @param  {Express Response object} res 
 * @param {Integer} statusCode failure status code. Usually begins with 4xx
 * @param  {String} message Message indicating failure (could include more helpfulerror information)
 * @return {Express Response object}  res  HTTP response with status code  and response body.     
 */

function sendError(res, statusCode, message) {
    var response = {
        message: message
    };
    res.status(statusCode).json(response);
}


/**

sends a message given to, from, message body, and SMS service configurations (username, password, uri)

From FireText API Documentation:
In order to send a message using the Firetext gateway, you will need to send a request to:
https://www.firetext.co.uk/api/sendsms
The following are a list of parameters to be sent via HTTP POST or GET:
Name	Description
username	Your FireText.co.uk username
password	Your FireText.co.uk password
....
Example:
https://www.firetext.co.uk/api/sendsms?username=myusername&password=mypassword&message=This+is+a+test+message&from=FireText&to=07123456789,447712345678&schedule=2010-05-22%2017:00&reference=1234567 
 */



let sendRequestToSmsService = function({from, to, message}, smsServiceConfig){
	let body = {from, to, message};
	body.username = smsServiceConfig.username;
	body.password = smsServiceConfig.password;

	var options = {
		uri: smsServiceConfig.uri,
		qs: body
	}

	return requestPromise(options)
		   .then((data) => {
            	return data;
        	})
        	.catch((error) => {
            	Promise.reject(new Error("ERROR ::: " + error.message))
        	});

}

/**
 * Given date as as String in format: YYYY-MM-DD HH:MM:SS and representing BST, this function converts it to a UTC string in the YYYY-MM-DD HH:MM:SS format. 
 * @param  {String} date Fromat: YYYY-MM-DD HH:MM:SS in BST
 * @return {String} date Fromat: YYYY-MM-DD HH:MM:SS in UTC
 */
let bstToUtc = function(date){
     let fmt   = "YYYY-MM-DD h:mm:ss";
     let zone = "Europe/London"
     let bstDateTime = momentTimezone.tz(date,fmt,zone)
     return bstDateTime.utc().format();
   
}


module.exports = {
	sendRequestToSmsService,
    sendSuccess,
    sendError,
    bstToUtc
}
