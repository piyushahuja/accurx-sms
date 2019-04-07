Some ideas for dicussion:



* (Decision): NHS number correspondng to Delivery receipts are computed on the fly
    * Alternative: Pre compute these values when the delivery receipt was saved or run period background process. This will be attractive if low latency on response for this API is important. 

* (Decision) In the mobile number database, two different records of mobile numbers can have the same NHS number.
    * Reason: People can change numbers or carry two phones.
    * Alternative: Impose the restriction of uniqueness on NHS numbers.
        * Con: We would need to deal with this case: request comes with a new mobile number but existing NHS number: If overwrite it, then delivery receipts to old number would not be seen.

* (Decision) In the mobile number database, one mobile number cannot map to more than two NHS numbers. If a request comes in with a new NHS number but existing mobile number, the old one is updated.
    *  Alternative: Allow two NHS numbers to have the same registered mobile number. (e.g. Elderly couple whose phone is handled by their caretaker) 


* Case: Request  with an invalid or no NHS number. Decision: We allow it to send the SMS forward, and save the mobile number wth the invalid NHS number in our data. But in the view receipts API, we do not show delivery receipts corresponding to such requests.
    *  Alternative: Fail Fast Strategy. Validate input on request, and throw error response.

* (Decision) Entries in the Databse are saved in the UTC time format.




