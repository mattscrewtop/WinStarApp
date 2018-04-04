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
			//HIDE SPINNER
			mobilePatron.HideActivity();

			$("form#frmResetPassword").submit(function (e)
			{
				e.preventDefault(); //prevent default form submit

				var data =
				{
					"PatronNumber": $("#PatronNumber").val(),
					"Pin": $("#Pin").val(),
					"NewPassword": $("#NewPassword").val()
				}

				//SHOW SPINNER
				mobilePatron.ShowActivity();

				mobilePatron.DoDoResetPassword(data).then
				(
					function ()
					{
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