/**
 * Type: Micro Service
 * Description: A short-lived service which is expected to complete within a fixed period of time.
 * @param {CbServer.BasicReq} req
 * @param {string} req.systemKey
 * @param {string} req.systemSecret
 * @param {string} req.userEmail
 * @param {string} req.userid
 * @param {string} req.userToken
 * @param {boolean} req.isLogging
 * @param {[id: string]} req.params
 * @param {CbServer.Resp} resp
 */

function resetAverages(req,resp){
    ClearBlade.init({ request: req });
    var query = ClearBlade.Query({collectionName: "challenge"});

    var callback = function (err, data) {
        if (err) {
        	resp.error("removal error : " + JSON.stringify(data));
        } else {
        	resp.success(data);
        }
    };

    query.remove(callback);
    resp.success("Success");
}
