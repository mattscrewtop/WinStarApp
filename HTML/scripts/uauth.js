(function (jQuery, Firebase, Path) {
    "use strict";

    // the main firebase reference
    var authRef = new Firebase('https://sweltering-inferno-2198.firebaseio.com/dev_matt/web/uauth');

    // pair our routes to our form elements and controller
    var routeMap = {
            '#/': {
            form: 'frmLogin',
            controller: 'login'
        },
            '#/logout': {
            form: 'frmLogout',
            controller: 'logout'
        },
            '#/register': {
            form: 'frmRegister',
            controller: 'register'
        },
            '#/forgot': {
            form: 'frmForgot',
            controller: 'forgot'
        },
            '#/profile': {
            form: 'frmProfile',
            controller: 'profile',
            authRequired: true // must be logged in to get here
        },
            '#/accounthome': {
            form: 'frmAccountHome',
            controller: 'accounthome',
            authRequired: true // must be logged in to get here
        },
            '#/hostinformation': {
            form: 'frmHostInformation',
            controller: 'hostinformation',
            authRequired: true // must be logged in to get here
        },
            '#/resortoffers': {
            form: 'frmResortOffers',
            controller: 'resortoffers',
            authRequired: true // must be logged in to get here
        },
            '#/vipevents': {
            form: 'frmVipEvents',
            controller: 'vipevents',
            authRequired: true // must be logged in to get here
        }
    };

    // create the object to store our controllers
    var controllers = {};

    // store the active form shown on the page
    var activeForm = null;


    function routeTo(route) {
        window.location.href = '#/' + route;
    }

    // Handle third party login providers
    // returns a promise
    function thirdPartyLogin(provider) {
        var deferred = $.Deferred();

        authRef.authWithOAuthPopup(provider, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise();
    };

    // Handle Email/Password login
    // returns a promise
    function authWithPassword(userObj) {
        var deferred = $.Deferred();
        console.log(userObj);
        authRef.authWithPassword(userObj, function onAuth(err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }

        });

        return deferred.promise();
    }

    // create a user but not login
    // returns a promsie
    function createUser(userObj) {
        var deferred = $.Deferred();
        authRef.createUser(userObj, function (err) {

            if (!err) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }

    // Create a user and then login in
    // returns a promise
    function createUserAndLogin(userObj) {
        return createUser(userObj)
            .then(function () {
            return authWithPassword(userObj);
        });
    }
    // Find Email
    // returns a promise
    function findUser(userObj) {
        var deferred = $.Deferred();
        authRef.findUser(userObj, function (err) {

            if (!err) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }
    // authenticate anonymously
    // returns a promise
    function authAnonymously() {
        var deferred = $.Deferred();
        authRef.authAnonymously(function (err, authData) {

            if (authData) {
                deferred.resolve(authData);
            }

            if (err) {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }

    // route to the specified route if sucessful
    // if there is an error, show the alert
    function handleAuthResponse(promise, route) {
        $.when(promise)
            .then(function (authData) {

            // route
            routeTo(route);

        }, function (err) {
            console.log(err);
            // pop up error
            showAlert({
                title: err.code,
                detail: err.message,
                className: 'alert-danger'
            });

        });
    }

    // options for showing the alert box
    function showAlert(opts) {
        var title = opts.title;
        var detail = opts.detail;
        var className = 'alert ' + opts.className;

        var alertBox = $('#authalert');
        alertBox.removeClass().addClass(className);
        alertBox.children('#alert-title').text(title);
        alertBox.children('#alert-detail').text(detail);
    }

    /// Controllers
    ////////////////////////////////////////

    controllers.login = function (form) {

        // Form submission for logging in
        form.on('submit', function (e) {

            var userAndPass = $(this).serializeObject();
            var loginPromise = authWithPassword(userAndPass);
            e.preventDefault();

            handleAuthResponse(loginPromise, 'profile');

        });

        // Social buttons
        form.children('.bt-social').on('click', function (e) {

            var $currentButton = $(this);
            var provider = $currentButton.data('provider');
            var socialLoginPromise;
            e.preventDefault();

            socialLoginPromise = thirdPartyLogin(provider);
            handleAuthResponse(socialLoginPromise, 'profile');

        });

        form.children('#btAnon').on('click', function (e) {
            e.preventDefault();
            handleAuthResponse(authAnonymously(), 'profilex');
        });

    };

    // logout immediately when the controller is invoked
    controllers.logout = function (form) {
        authRef.unauth();
    };

    controllers.register = function (form) {

        // Form submission for registering
        form.on('submit', function (e) {

            var userAndPass = $(this).serializeObject();
            var loginPromise = createUserAndLogin(userAndPass);
            e.preventDefault();

            handleAuthResponse(loginPromise, 'profile');

        });

    };

    controllers.forgot = function (form) {

        // Form submission for forgot password
        form.on('submit', function (e) {

            var user = $(this).serializeObject();
            var forgotPromise = findUser(user);
            e.preventDefault();

            handleAuthResponse(forgotPromise, 'forgot');

        });

    };
    controllers.profile = function (form) {
        // Check the current user
        var user = authRef.getAuth();
        var userRef;

        // If no current user send to register page
        if (!user) {
            routeTo('register');
            return;
        }

        // Load user info
        userRef = authRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }

            // set the fields
            $('#labelFirstname').html(user.firstname);
            $('#labelLastname').html(user.lastname);
            form.find('#txtEmail').val(user.email);
            form.find('#txtPhone').val(user.phone);
            form.find('#txtZip').val(user.zip);
            form.find('#txtState').val(user.state);
            form.find('#txtCity').val(user.city);
            form.find('#txtAddress2').val(user.address2);
            form.find('#txtAddress').val(user.address);
            form.find('#txtLastname').val(user.lastname);
            form.find('#txtFirstname').val(user.firstname);
            /*
            if (user.firstname.length > 0) {
                form.find('#txtPhone').prop('disabled', true);
                form.find('#txtZip').prop('disabled', true);
                form.find('#txtState').prop('disabled', true);
                form.find('#txtCity').prop('disabled', true);
                form.find('#txtAddress2').prop('disabled', true);
                form.find('#txtAddress').prop('disabled', true);
                form.find('#txtLastname').prop('disabled', true);
                form.find('#txtFirstname').prop('disabled', true);
            }
            */
        });

        // Save user's info to Firebase
        form.on('submit', function (e) {
            e.preventDefault();
            var userInfo = $(this).serializeObject();

            userRef.set(userInfo, function onComplete() {
                    console.log("Successfully logged in");
                    console.info(userInfo);
                // show the message if write is successful
                showAlert({
                    title: 'Successfully saved!',
                    detail: 'You are still logged in',
                    className: 'alert-success'
                });

            });
        });

    };
    controllers.accounthome = function (form) {
        // Check the current user
        var user = authRef.getAuth();
        var userRef;

        // If no current user send to register page
        if (!user) {
            routeTo('register');
            return;
        }

        // Load user info
        userRef = authRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }
            //console.table(form);
            var elementFirstname = form.find('#labelFirstname');
            var elementLastname = form.find('#labelLastname');
            // set the fields
            if (typeof(elementFirstname) != 'undefined' && elementFirstname != null) {
                elementFirstname.html(user.firstname);
                //console.table(user.firstname);
            }
            if (typeof(elementLastname) != 'undefined' && elementLastname != null) {
                elementLastname.html(user.lastname);
                //console.table(user.lastname);
            }
        });

    };
    controllers.resortoffers = function (form) {
        // Check the current user
        var user = authRef.getAuth();
        var userRef;

        // If no current user send to register page
        if (!user) {
            routeTo('register');
            return;
        }

        // Load user info
        userRef = authRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }

            // set the fields
            //form.find('#txtEmail2').val(user.email);
        });

    };
    controllers.vipevents = function (form) {
        // Check the current user
        var user = authRef.getAuth();
        var userRef;

        // If no current user send to register page
        if (!user) {
            routeTo('register');
            return;
        }

        // Load user info
        userRef = authRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }

            // set the fields
            //form.find('#txtEmail2').val(user.email);
        });

    };
    controllers.hostinformation = function (form) {
        // Check the current user
        var user = authRef.getAuth();
        var userRef;

        // If no current user send to register page
        if (!user) {
            routeTo('register');
            return;
        }

        // Load user info
        userRef = authRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }

            // set the fields
            //form.find('#txtEmail2').val(user.email);
        });

    };
    /// Routing
    ////////////////////////////////////////

    // Handle transitions between routes
    function transitionRoute(path) {
        // grab the config object to get the form element and controller
        var formRoute = routeMap[path];
        var currentUser = authRef.getAuth();

        // if authentication is required and there is no
        // current user then go to the register page and
        // stop executing
        if (formRoute.authRequired && !currentUser) {
            routeTo('register');
            return;
        }

        // wrap the upcoming form in jQuery
        var upcomingForm = $('#' + formRoute.form);

        // if there is no active form then make the current one active
        if (!activeForm) {
            activeForm = upcomingForm;
        }

        // hide old form and show new form
        activeForm.hide();
        upcomingForm.show().hide().fadeIn(750);

        // remove any listeners on the soon to be switched form
        activeForm.off();

        // set the new form as the active form
        activeForm = upcomingForm;

        // invoke the controller
        controllers[formRoute.controller](activeForm);
        var element = document.getElementById(formRoute.controller);
        if (typeof(element) != 'undefined' && element != null) {
            $('#'+formRoute.controller)[0].scrollIntoView(false);
        }
    }

    // Set up the transitioning of the route
    function prepRoute() {
        transitionRoute(this.path);
    }


    /// Routes
    ///  #/         - Login
    //   #/logout   - Logut
    //   #/register - Register
    //   #/forgot - Forgot Password
    //   #/accounthome - Account Home
    //   #/resortoffers - Resort Offers
    //   #/hostinformation - Host Information
    //   #/vipevents - VIP Events
    //   #/profile  - Account Information

    Path.map("#/").to(prepRoute);
    Path.map("#/logout").to(prepRoute);
    Path.map("#/register").to(prepRoute);
    Path.map("#/forgot").to(prepRoute);
    Path.map("#/accounthome").to(prepRoute);
    Path.map("#/resortoffers").to(prepRoute);
    Path.map("#/hostinformation").to(prepRoute);
    Path.map("#/vipevents").to(prepRoute);
    Path.map("#/profile").to(prepRoute);

    Path.root("#/");

    /// Initialize
    ////////////////////////////////////////

    $.initLogin = function () {

        // Start the router
        Path.listen();

        // whenever authentication happens send a popup
        authRef.onAuth(function globalOnAuth(authData) {

            if (authData) {
                showAlert({
                    title: 'Logged in!',
                    detail: 'Using ' + authData.provider,
                    className: 'alert-success'
                });
            } else {
                showAlert({
                    title: 'You are not logged in',
                    detail: '',
                    className: 'alert-info'
                });
            }

        });

    }

}(window.jQuery, window.Firebase, window.Path))