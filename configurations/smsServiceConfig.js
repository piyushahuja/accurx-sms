


const smsServiceConfig = {
	
	FIRETEXT: {
		name: "Firetext",
		uri: "https://www.firetext.co.uk/api/sendsms",
		username: 'Your FireText.co.uk username',
		password: 'Your FireText.co.uk password',
		//An apiKey can be used as an alternative authentication method to the username and password and is often the preferred choice.
		apiKey: '',
		senderID:  "NHS",
		nominatedUrl: "/api/firetext/"
	}
	
	

}

module.exports = smsServiceConfig;