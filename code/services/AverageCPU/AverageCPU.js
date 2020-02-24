


function AverageCPU(req,resp){
    ClearBlade.init({ request: req });
    var messaging = ClearBlade.Messaging();  //access messaging
    var allAverages = [];
    var totalNumber = 0.0;
    var collectionSize = 0;
    var finalAverage = 0.0;


     var callback = function (err, data) {
        if (err) {
        	resp.error("fetch error : " + JSON.stringify(data));
        } else {
           var dataTest = data.DATA;   // access the actual "DATA" array inside the JSON that contains the needed values
           collectionSize = parseInt(data.TOTAL); // access the "TOTAL" inside the JSON that holds total # of rows
           for (var i in dataTest){     // iterate through the "DATA"
               var percentage = dataTest[i].percentage;   // variable to hold value from each row
               var temp = parseFloat(percentage);   // convert from string to float
               allAverages.push(temp);  // push into an array
           }
           for(var i = 0, len = allAverages.length; i < len; i++){  // loop through the array
               totalNumber += allAverages[i];                       // to count the sum of all rows
           }
           totalNumber = totalNumber.toFixed(2);        // round the sum to 2 decimals
           finalAverage = totalNumber / collectionSize; // count the average
           finalAverage = finalAverage.toFixed(2);      // round the average to 2 decimals
           if (finalAverage == "NaN"){
               messaging.publish("analytics", "The CPU average since the last analysis is not currently available");
           }
           else{
               messaging.publish("analytics", "The CPU average since the last analysis is: " + finalAverage); // publish results to "analytics" topic in messages
           }
            resp.success(data);
        }
    };

   	var query = ClearBlade.Query({collectionName: "challenge"});  // create a query 
    query.columns(["percentage"]);  // specify the column
    query.setPage(0, 0);    // set the page number to 0 to retrieve all the data from the collection
    
    query.fetch(callback);

}
