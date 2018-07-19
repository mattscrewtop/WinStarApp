/**
 * Possible parameters for request:
 *  action: "xhttp" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhttp") {

	    $.ajax({
	        type: request.method,
	        url: request.url,
	        data: request.data,
	        success: function(responseText){
	            callback(responseText);
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            //if required, do some error handling
	            callback();
	        }
	    });

	    return true; // prevents the callback from being called too early on return
    }
});