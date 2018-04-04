function AJAX(){
    var objSelf = this;

    // This struct will cache the current XmlHTTP requests
    // so that we can reference them if a call fails.
    this.CurrentRequests = {};
}
AJAX.prototype.GetJSON = function( $1, $2, $3, $4 ){
    var objSelf = this;
    var strName = $1;
    var strURL = $2; //$my.mywinstarhost + '/login/authenticate'
    var objOptions = $3; //JSON.stringify(data)
    var fnCallback = $4;

    if (arguments.length == 3){
        // Name is not being used.
        strName = null;
        strURL = $1;
        objOptions = $2;
        fnCallback = $3;
    }

    if (!strName || !this.CurrentRequests[ strName ]){

        // Store current request.
        this.CurrentRequests[ strName ] = true;

        showActivity();
        $.ajax({
            beforeSend: $my.userToken.length ? function(request) {request.setRequestHeader("X-PATRONS-AUTH-TOKEN", $my.userToken);} : "",
            type: "POST",
            url: strURL,
            data: objOptions,
            contentType: "application/json; charset=UTF-8",

            success: function (resultsFromServer)
            {
                // Remove request flag.
                objSelf.CurrentRequests[ strName ] = false;
                //SAVE CURRENT USER AND TOKEN FROM SERVER
                //localStorage.setItem('CurrentUser', JSON.stringify(resultsFromServer.CurrentUser));
                //localStorage.setItem('Tokem', JSON.stringify(resultsFromServer.Token));
                fnCallback( resultsFromServer );
            },
            error: function ( xhr, errorType )
            {
                objSelf.CurrentRequests[ strName ] = false;
                if (errorType == "error"){
                    // Show the error.

                    fnCallback( xhr );
                    //objSelf.AJAXFailHandler(
                    //    xhr ,
                    //    fnCallback
                    //    );
                }
            }
        });
    } else {
        // This request is currently being processed.
        alertify.alert( "Request being processed. Be patient." );
    }
}
// This will handle all AJAX failures.
AJAX.prototype.AJAXFailHandler = function( objRequest, fnCallback ){
    // Since this AJAX request failed, let's call the callback
    // but manually create a failure response.
    //console.table(objRequest);
    fnCallback( objRequest );
}

/*
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
*/