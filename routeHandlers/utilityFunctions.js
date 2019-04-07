const requestPromise = require('request-promise');
const smsServiceConfig = require('../configurations/smsServiceConfig');


/**



From FireText API Documentation:


Send A Message
In order to send a message using the Firetext gateway, you will need to send a request to:

https://www.firetext.co.uk/api/sendsms
The following are a list of parameters to be sent via HTTP POST or GET:

Name	Description
username	Your FireText.co.uk username
password	Your FireText.co.uk password
....
Example:
https://www.firetext.co.uk/api/sendsms?username=myusername&password=mypassword&message=This+is+a+test+message&from=FireText&to=07123456789,447712345678&schedule=2010-05-22%2017:00&reference=1234567



------


From Request-Promise library:

GET something from a JSON REST API
var options = {
    uri: 'https://api.github.com/user/repos',
    qs: {
        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
 
rp(options)
    .then(function (repos) {
        console.log('User has %d repos', repos.length);
    })
    .catch(function (err) {
        // API call failed...
    });
 



 */



let sendRequestToSmsService = function({from, to, message}){
	let body = {from, to, message};
	body.username = smsServiceConfig.Firetext.username;
	body.password = smsServiceConfig.Firetext.password;

	var options = {
		uri: smsServiceConfig.Firetext.uri,
		qs: body
		
	}
	console.log("options:" + JSON.stringify(options));

	return requestPromise(options)
		   .then((data) => {
            	console.log('RESULT ::: ', JSON.stringify(data));
            	return data;
        	})
        	.catch((error) => {
            	console.log('ERROR ::: ', error.message);
            	Promise.reject(new Error("ERROR ::: " + error.message))
        	});

}


module.exports = {
	sendRequestToSmsService
}




