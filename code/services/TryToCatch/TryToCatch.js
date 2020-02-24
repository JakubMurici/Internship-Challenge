


function catchMessage(req, resp) {
  ClearBlade.init({ request: req });
  var messaging = ClearBlade.Messaging();  //access messaging
  const TOPIC = "CPU-Usage";
  messaging.subscribe(TOPIC, WaitLoop);   //access CPU-Usage topic

  var callback = function (err, data) {
        if (err) {
        	resp.error("creation error : " + JSON.stringify(data));
        } else {
        	resp.success(data);
        }
    };

  function WaitLoop(err, data) {

    if (err) {
      resp.error(data);
    }
    var stop = true;
    while (stop) {
      stop = false;
      messaging.waitForMessage([TOPIC], function(err, msg, topic) {  //catches every new message in the topic
        if (err) {
        } 
        processMessage(msg, topic);
      });
    }
  }

  function processMessage(msg, topic) {
  
    var insert = {     
        percentage: msg   //percentage column in the collection
    };
    
    var col = ClearBlade.Collection( {collectionName: "challenge" } );   //define collection to be used
    col.create(insert, callback);    // insert data into collection
  }
}
