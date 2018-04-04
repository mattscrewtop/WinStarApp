
function MobilePatron()
{
	function renderSweepstakes(list)
	{
		if (list)
		{
			//console.log('render sweepstakes:', list);

			var innerhtml = "";

			for (var i = 0; i < list.length; i++)
			{
				var onClick = "mobilePatron.OnSweepstakesClick('" + list[i].codeField + "','" + list[i].textField + "')";
				innerhtml += '<li><a href="JavaScript:' + onClick + '">' + list[i].textField + '</a></li>';
			}

			$('#sweepstakesentries').html(innerhtml);
		}
		else
		{
			$('#sweepstakesentries').html("<li>You have no current sweepstakes entries.</li>");
		}
	};

	function doLogout()
	{
		var deferred = $.Deferred();

		localStorage.clear();

		deferred.resolve();

		return deferred.promise();
	}

	function setLoggedInTimestamp()
	{
		localStorage.setItem('LoggedInTimestamp', moment().format());
		initializeLogoutTimer();

	}

	function processCurrentUser(resultsFromServer)
	{
		//SAVE CURRENT USER AND TOKEN FROM SERVER
		localStorage.setItem('CurrentUser', JSON.stringify(resultsFromServer.CurrentUser));
		localStorage.setItem('Token', resultsFromServer.Token);
		setLoggedInTimestamp();
	};

	function initializeLogoutTimer()
	{
		if (localStorage.getItem("LoggedInTimestamp"))
		{
			//var loggedInTimeStamp = localStorage.getItem("LoggedInTimestamp");
			//var loggedInMoment = new moment(loggedInTimeStamp);
			//var difference = moment().diff(loggedInMoment, 'seconds', true);
			//console.log('loggedInTimeStamp:', loggedInTimeStamp);
			//console.log('duration in seconds:', difference + '(' + difference/60 + ' minutes)');
			//console.log('logOut Timer In:', logOutTimerInMilliseconds/1000/60 + ' minutes');

			var checkLoginTimeStampTimer = setTimeout
			(
				function ()
				{
					var autoLogoutTimer = setTimeout
											(
												function ()
												{
													doLogout().then
													(
														function ()
														{
															window.location.href = "index.html";
														}
													);
												},
												30000	//30000 MILLISECONDS IS 30 SECONDS
											);

					alertify.alert
					(
						"Select the button below to continue viewing your account information. Otherwise, your account will be automatically logged out after 30 seconds.",
						function onOk()
						{
							//console.log('ok, you can continue');
							clearTimeout(autoLogoutTimer);
							clearTimeout(checkLoginTimeStampTimer);
							setLoggedInTimestamp();
						}
					).setting
					({
						'label': 'Continue Session'
					});
				},
				300000  //300000 MILLISECONDS IS 5 MINUTES
			);
		}
	}


	var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
	var token = localStorage.getItem('Token');


	//DATA
	this.url = "http://dev.mobile-patron.solutiaconsulting.com:80/api/";
	this.urlVip = "https://sweltering-inferno-2198.firebaseio.com/sections/mywinstar/vipevents/pages/events";
	this.urlHosts = "https://sweltering-inferno-2198.firebaseio.com/sections/mywinstar/mobilePatronsHostInformation/pages/hosts";
	this.urlHomePageDisclaimer = "https://sweltering-inferno-2198.firebaseio.com/sections/mywinstar/homePage/offers_disclaimer";
	this.urlOffersDisclaimer = "https://sweltering-inferno-2198.firebaseio.com/sections/mywinstar/myOffers/offers_disclaimer";
	this.urlAccountInformationDisclaimer = "https://sweltering-inferno-2198.firebaseio.com/sections/mywinstar/mobilePatronsAccountInformation/offers_disclaimer";
	this.TimeoutInterval = undefined;

	this.CurrentUser = (currentUser) ? currentUser : undefined;

	// SHOW PATRON INFORMATION
	this.ShowPatronInformation = function ()
	{
		if (currentUser)
		{
			$("span#FirstName").html(currentUser.FirstName);
			$("span#LastName").html(currentUser.LastName);
			$("span#CurrentCardLevel").html(currentUser.CurrentCardLevel);
			$("span#CashAvailable").html(currentUser.CashAvailable);

			var points = (currentUser.CurrentPoints) ? currentUser.CurrentPoints : '';
			$("span#CurrentPoints").html(points);

			var pointsToNextLevel = (currentUser.PointsToNextLevel) ? currentUser.PointsToNextLevel : '';
			$("span#PointsToNextLevel").html(pointsToNextLevel);

			var expirationDate = moment(currentUser.PointsToNextLevelByDate, "YYYYMMDD");

			$("span#ExpirationDate").html(expirationDate.format("MMMM DD, YYYY"));

			if (currentUser.IsGolfMember) 
			{
				$('#ActiveGolfMembership').show();
			} 
			else 
			{
				$('#ActiveGolfMembership').hide();
			}

			//SET CARD LEVEL BADGE
			if (currentUser.CurrentCardLevel.trim() === 'PREMIER')
			{
				$('img#imageBadge').attr('src', 'images/Badges/Badge-Premier.png').attr('alt', 'Level: Premier');
			}
			else if (currentUser.CurrentCardLevel.trim() === 'ELITE')
			{
				$('img#imageBadge').attr('src', 'images/Badges/Badge-Elite.png').attr('alt', 'Level: Elite');
			}
			else
			{
				$('img#imageBadge').attr('src', 'images/Badges/Badge-Club.png').attr('alt', 'Level: Club');
			}
		}
	};

	this.ShowPatronCasinoHost = function ()
	{
		if (currentUser.HostName) 
		{
			$("#VipHostName").html("Your Casino Host is: " + currentUser.HostName);
		} 
	};


	//SHOW ACCOUNT INFORMATION
	this.ShowAccountInformation = function ()
	{
		$("span.FirstName").html(currentUser.FirstName);
		$("span.LastName").html(currentUser.LastName);
		$("input#EmailAddress").val(currentUser.EmailAddress);
		$("span.Address1").html(currentUser.AddressLine1);
		$("span.Address2").html(currentUser.AddressLine2);
		$("span.City").html(currentUser.City);
		$("span.State").html(currentUser.State);
		$("span.Zip").html(currentUser.Zip);
		$("span.PhoneNumber").html(currentUser.PhoneNumber);
	};


	//GET PATRON INFORMATION
	this.GetCurrentPatronDetail = function ()
	{
		var url = this.url + "patron/detail";

		if (token)
		{
			$.ajax({
				beforeSend: function (request)
				{
					request.setRequestHeader("X-PATRONS-AUTH-TOKEN", token);
				},
				type: "GET",
				url: this.url + "patron/detail",
				contentType: "application/json; charset=UTF-8",
				success: function (resultsFromServer)
				{
					processCurrentUser(resultsFromServer);
				},
				error: function (errorFromServer)
				{
				}
			});
		}
		else
		{
			this.DoLogout();
			//REDIRECT USER
			window.location.href = "index.html";
		}
	};


	// SWEEPSTAKES
	this.GetSweepstakes = function ()
	{
		var deferred = $.Deferred();

		//IF SWEEPSTAKES EXIST IN LOCAL STORAGE
		if (localStorage.getItem("SweepStakes"))
		{
			var sweepStakesList = JSON.parse(localStorage.getItem("SweepStakes"));
			renderSweepstakes(sweepStakesList);
			deferred.resolve(sweepStakesList);
		}
		else
		{
			if (token)
			{
				$.ajax({
					beforeSend: function (request)
					{
						request.setRequestHeader("X-PATRONS-AUTH-TOKEN", token);
					},
					type: "GET",
					url: this.url + "sweepstakes/list",
					contentType: "application/json; charset=UTF-8",
					success: function (resultsFromServer)
					{
						localStorage.setItem('SweepStakes', JSON.stringify(resultsFromServer));

						renderSweepstakes(resultsFromServer);
						deferred.resolve(resultsFromServer);
					},
					error: function (errorFromServer)
					{
						$('#sweepstakesentries').html("<li>You have no current sweepstakes entries.</li>");

						localStorage.setItem('SweepStakes', null);

						deferred.reject(errorFromServer);
					}
				});
			}
			else
			{
				this.DoLogout();
				//REDIRECT USER
				window.location.href = "index.html";
			}
		}

		return deferred.promise();
	};


	// SWEEPSTAKES
	this.GetSweepstakeDrawings = function (sweepStakeCode)
	{
		var deferred = $.Deferred();

		if (token)
		{
			var data =
			{
				"Offer": sweepStakeCode
			}

			$.ajax({
				beforeSend: function (request)
				{
					request.setRequestHeader("X-PATRONS-AUTH-TOKEN", token);
				},
				type: "POST",
				url: this.url + "sweepstakes-drawings/list/",
				data: JSON.stringify(data),
				contentType: "application/json; charset=UTF-8",
				success: function (resultsFromServer)
				{
					deferred.resolve(resultsFromServer);
				},
				error: function (errorFromServer)
				{
					deferred.reject(errorFromServer);
				}
			});
		}
		else
		{
			this.DoLogout();
			//REDIRECT USER
			window.location.href = "index.html";
		}

		return deferred.promise();
	};


	// OFFERS
	this.GetOffers = function ()
	{
		var deferred = $.Deferred();

		//IF OFFERS LIST EXIST IN LOCAL STORAGE
		if (localStorage.getItem("OffersList"))
		{
			var offersList = JSON.parse(localStorage.getItem("OffersList"));
			deferred.resolve(offersList);
		}
		else
		{
			if (token)
			{
				$.ajax({
					beforeSend: function (request)
					{
						request.setRequestHeader("X-PATRONS-AUTH-TOKEN", token);
					},
					type: "GET",
					url: this.url + "offers/list",
					contentType: "application/json; charset=UTF-8",
					success: function (resultsFromServer)
					{
						localStorage.setItem('OffersList', JSON.stringify(resultsFromServer));

						deferred.resolve(resultsFromServer);
					},
					error: function (errorFromServer)
					{
						deferred.reject(errorFromServer);
					}
				});
			}
			else
			{
				this.DoLogout();
				//REDIRECT USER
				window.location.href = "index.html";
			}
		}

		return deferred.promise();
	};


	// POWER REWARDS
	this.GetPowerRewards = function ()
	{
		var deferred = $.Deferred();

		//IF OFFERS LIST EXIST IN LOCAL STORAGE
		if (localStorage.getItem("PowerRewards"))
		{
			var powerRewardsList = JSON.parse(localStorage.getItem("PowerRewards"));
			deferred.resolve(powerRewardsList);
		}
		else
		{
			if (token)
			{
				$.ajax({
					beforeSend: function (request)
					{
						request.setRequestHeader("X-PATRONS-AUTH-TOKEN", token);
					},
					type: "GET",
					url: this.url + "power-rewards/list",
					contentType: "application/json; charset=UTF-8",
					success: function (resultsFromServer)
					{
						localStorage.setItem('PowerRewards', JSON.stringify(resultsFromServer));

						deferred.resolve(resultsFromServer);
					},
					error: function (errorFromServer)
					{
						deferred.reject(errorFromServer);
					}
				});
			}
			else
			{
				this.DoLogout();
				//REDIRECT USER
				window.location.href = "index.html";
			}
		}

		return deferred.promise();
	};


	// VIP EVENTS
	this.GetVipEvents = function ()
	{
		var deferred = $.Deferred();

		var hostsFirebase = new Firebase(this.urlVip);

		hostsFirebase.on('value', function (jsonFromServer)
		{
			deferred.resolve(jsonFromServer.val());
		});

		return deferred.promise();
	};


	// HOSTS
	this.GetHosts = function ()
	{
		var deferred = $.Deferred();

		var hostsFirebase = new Firebase(this.urlHosts);

		hostsFirebase.on('value', function (jsonFromServer)
		{
			deferred.resolve(jsonFromServer.val());
		});

		return deferred.promise();
	};


	// HOME PAGE DISCLAIMER
	this.GetHomePageDisclaimer = function ()
	{
		var deferred = $.Deferred();

		var hostsFirebase = new Firebase(this.urlHomePageDisclaimer);

		hostsFirebase.on('value', function (jsonFromServer)
		{
			deferred.resolve(jsonFromServer.val());
		});

		return deferred.promise();
	};


	// OFFERS DISCLAIMER
	this.GetOffersDisclaimer = function ()
	{
		var deferred = $.Deferred();

		var hostsFirebase = new Firebase(this.urlOffersDisclaimer);

		hostsFirebase.on('value', function (jsonFromServer)
		{
			deferred.resolve(jsonFromServer.val());
		});

		return deferred.promise();
	};


	// ACCOUNT INFORMATION DISCLAIMER
	this.GetAccountInformationDisclaimer = function ()
	{
		var deferred = $.Deferred();

		var hostsFirebase = new Firebase(this.urlAccountInformationDisclaimer);

		hostsFirebase.on('value', function (jsonFromServer)
		{
			deferred.resolve(jsonFromServer.val());
		});

		return deferred.promise();
	};


	//UPDATE EMAIL ADDRESS
	this.UpdateEmailAddress = function (data)
	{
		var deferred = $.Deferred();
		var that = this;

		if (token)
		{
			$.ajax({
				beforeSend: function (request)
				{
					request.setRequestHeader("X-PATRONS-AUTH-TOKEN", token);
				},
				type: "POST",
				url: this.url + 'email-address/save',
				data: JSON.stringify(data),
				contentType: "application/json; charset=UTF-8",
				success: function (resultsFromServer)
				{
					processCurrentUser(resultsFromServer);

					deferred.resolve(resultsFromServer);
				},
				error: function (errorFromServer)
				{
					deferred.reject(errorFromServer);
				}
			});
		}
		else
		{
			this.DoLogout();
			//REDIRECT USER
			window.location.href = "index.html";
		}

		return deferred.promise();
	};


	// DO REGISTRATION
	this.DoRegistration = function (registrationData)
	{
		var deferred = $.Deferred();

		$.ajax({
			type: "POST",
			url: this.url + 'account/register',
			data: JSON.stringify(registrationData),
			contentType: "application/json; charset=UTF-8",
			success: function (resultsFromServer)
			{
				processCurrentUser(resultsFromServer);
				deferred.resolve(resultsFromServer);
			},
			error: function (errorFromServer)
			{
				deferred.reject(errorFromServer);
			}
		});

		return deferred.promise();
	};


	// DO RESET PASSWORD
	this.DoDoResetPassword = function (resetPasswordData)
	{
		var deferred = $.Deferred();

		$.ajax({
			type: "POST",
			url: this.url + 'password/save',
			data: JSON.stringify(resetPasswordData),
			contentType: "application/json; charset=UTF-8",
			success: function (resultsFromServer)
			{
				processCurrentUser(resultsFromServer);
				deferred.resolve(resultsFromServer);
			},
			error: function (errorFromServer)
			{
				deferred.reject(errorFromServer);
			}
		});

		return deferred.promise();
	};


	// DO LOGIN
	this.DoLogin = function (loginData)
	{
		var deferred = $.Deferred();

		$.ajax({
			type: "POST",
			url: this.url + 'login/authenticate',
			data: JSON.stringify(loginData),
			contentType: "application/json; charset=UTF-8",
			success: function (resultsFromServer)
			{
				processCurrentUser(resultsFromServer);
				deferred.resolve(resultsFromServer);
			},
			error: function (errorFromServer)
			{
				deferred.reject(errorFromServer);
			}
		});

		return deferred.promise();
	};


	//LOGOUT
	this.DoLogout = function ()
	{
		return doLogout();
	};


	//CLICKING A SWEEPSTAKES
	this.OnSweepstakesClick = function (code, name)
	{
		localStorage.setItem('SweepStakesCode', JSON.stringify(code));
		localStorage.setItem('SweepStakesName', JSON.stringify(name));
		window.location.href = "mobilePatronSweepstakesDrawings.html";
	};


	//RETURN IF CURRENT USER HAS HOST FLAG
	this.HasHostFlag = function ()
	{
		return (currentUser && currentUser.HostFlag !== 'N') ? true : false;
	};


	//SHOW ACTIVITY
	this.ShowActivity = function ()
	{
		$("#spinnerContainer").show();
	};


	//HIDE ACTIVITY
	this.HideActivity = function ()
	{
		$("#spinnerContainer").fadeOut("slow"); // will fade out the white DIV that covers the
	};


	//CHECK IF USER SHOULD BE PROMPTED TO BE LOGGED OUT
	initializeLogoutTimer();
}