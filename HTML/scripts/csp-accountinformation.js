		var myslickEnabled = false;
		$(document).ready(initPage);
		$(window).load(loadPage);

		if ('ontouchstart' in window)
		{
			window.FastClick.attach(document.body);
		}


		var mobilePatron = new MobilePatron();

		//SHOW SPINNER
		mobilePatron.ShowActivity();

		$(document).ready(function ()
		{
			//SHOW PATRON INFORMATION
			mobilePatron.init();

			//SHOW ACCOUNT INFORMATION
			mobilePatron.ShowAccountInformation();

			//HIDE SPINNER
			mobilePatron.HideActivity();

			$("form#frmAccountInformation").submit(function (e)
			{
				e.preventDefault(); //prevent default form submit

				var data =
				{
					"NewEmailAddress": $("#EmailAddress").val()
				}

				//SHOW SPINNER
				mobilePatron.ShowActivity();

				mobilePatron.UpdateEmailAddress(data).then
				(
					function ()
					{
						//HIDE SPINNER
						mobilePatron.HideActivity();

						//REDIRECT USER
						window.location.href = "mobilePatronsHome.html";
					},
					function (errorFromServer)
					{
						//HIDE SPINNER
						mobilePatron.HideActivity();

						//console.log('registration error:', errorFromServer);
						alertify.alert(errorFromServer.responseJSON.ErrorTitle, errorFromServer.responseJSON.ErrorDetail);
					}
				);
			});
		});