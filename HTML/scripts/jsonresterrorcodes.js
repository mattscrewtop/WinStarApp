jQuery(function( $ ){

    // Get our output reference.
    var output = $( "#output" );
    // This is the function that will handle all of the
    // AJAX requests.
    var makeAPIRequest = function( data ){
        // Make the API call with the given data.
        $.ajax({
            type: 'post',
            url: $my.mywinstarhost + endpoint,
            data: data,
            dataType: 'json',
            // This method will handle 200 responses only!
            success: function( response ){
                // Show the successful response.
                showSuccess( response );
            },
            // This method will handle all non-200
            // reponses. This will include 400, 404, and
            // 500 status codes.
            error: function( xhr, errorType ){
                // Check to see if the type of error is
                // "error". If so, then it's an error
                // thrown by our server (if it is a
                // "timeout", then the error is in the
                // commuication itself).
                //
                // NOTE: Because this is an error, jQuery
                // did NOT parse the JSON response; as
                // such, we have to do that manually.
                if (errorType == "error"){
                    // Show the error.
                    showError(
                        xhr.status,
                        xhr.statusText,
                        $.parseJSON( xhr.responseText )
                    );
                } else {
                    showAlert({
                        title: err.code,
                        detail: err.message,
                        className: 'alert-danger'
                    });
                }
            }
        });
    };
    // I show error responses.
    var showError = function( statusCode, statusText, errors ){
        output.html(
            ("<p>StatusCode: " + statusCode + "</p>") +
            ("<p>StatusText: " + statusText + "</p>") +
            ("<p>Errors: " + errors.join( ", " ) + "</p>")
        );
    };
    // I show success responses.
    var showSuccess = function( girl ){
        output.html(
            ("<p>ID: " + girl.ID + "</p>") +
            ("<p>Name: " + girl.NAME + "</p>")
        );
    };
    // Bind the good request
    $("form#frmRegister").submit(
        function ( e ) {
            var data =
            {
                "UserName": $("#UserName").val(),
                "Password": $("#Password").val(),
                "PatronNumber": $("#PatronNumber").val(),
                "Pin": $("#Pin").val()
            }
            // Prevent the default action (location).
            e.preventDefault();
            // Make the API call with good data.
            makeAPIRequest( data );
        }
    );
});