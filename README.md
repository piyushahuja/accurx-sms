We would like you to make a basic web API which would allow a client to send a text message and query delivery receipts for texts sent over the last month.

You can use “Firetext” as the API for sending texts (you don’t need to create an account).

The API for sending a message is here:

[https://www.firetext.co.uk/docs#sendingsms](https://www.firetext.co.uk/docs#sendingsms)

They then post back a delivery receipt to a nominated url (you can assume for the sake of this task that you’ve already given them a url which they post back to).

[https://www.firetext.co.uk/docs#reports-receive](https://www.firetext.co.uk/docs#reports-receive) (note that the “time” that comes back here is always in London timezone i.e. BST in summer)

You will need to have three web end points on your web server. One will take a json object with the following fields to send a text message:

Mobile Number (string)
Message text (string)
Nhs number (10 digit number)

One end point will simply return a list of delivery receipts for the last month’s text messages. The returned data from this endpoint is up to you but must include the patient’s nhs number that the text was sent to.

The last will be your nominated url for Firetext to post back to.

You are free to use any frameworks or languages of your choice. You do not need to auth your endpoints or have user accounts. Please submit your code as a zip in an email or a small GitHub repo. You will not be marked on any tests you do or do not add! We're not looking for a 100% completed solution but enough depth for us to understand how you think.

Please spend up to but not over 4 hours.