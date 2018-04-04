jQuery(document).ready(function(){ 
/*
	jQuery.ajaxSetup({ cache: true });
	jQuery.getScript('http://connect.facebook.net/en_UK/all.js', function(){
		FB.init({
			appId: '407931759365594',
			xfbml: false
		});     
		$('#loginbutton,#feedbutton').removeAttr('disabled');
		FB.getLoginStatus(updateStatusCallback);
	});
	jQuery.ajaxSetup({ cache: false });

	 FB.login("facebook-jssdk", function(response) {
	   if (response.authResponse) {
	     console.log('Welcome!  Fetching your information.... ');
	     FB.api('/me', function(response) {
	       console.log('Good to see you, ' + response.name + '.');
	     });
	   } else {
	     console.log('User cancelled login or did not fully authorize.');
	   }
	 }, {
			scope: "public_profile, email, user_friends"
	});
 
function updateStatusCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}
  
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
*/
/*
var ref = new Firebase("https://sweltering-inferno-2198.firebaseio.com");

ref.authWithOAuthRedirect("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}, {
  remember: "sessionOnly",
  scope: "email,user_likes"
});

ref.authWithOAuthRedirect("twitter", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}, {
  remember: "sessionOnly",
  scope: "email,user_likes"
});

ref.authWithOAuthRedirect("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}, {
  remember: "sessionOnly",
  scope: "email,user_likes"
});

ref.authWithOAuthRedirect("github", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}, {
  remember: "sessionOnly",
  scope: "email,user_likes"
});

*/
  
});