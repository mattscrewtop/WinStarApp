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

			//MAKE CALL TO BACK END: SWEEPSTAKES
			$.when(mobilePatron.GetSweepstakes()).then(
				function ()
				{
					//HIDE SPINNER
					mobilePatron.HideActivity();
				},
				function ()
				{
					//HIDE SPINNER
					mobilePatron.HideActivity();
				}
			);

			//ON CLICK FOR LOG OUT BUTTON
			$("#logoutButton").click(function ()
			{
				mobilePatron.DoLogout().then
				(
					function ()
					{
						//REDIRECT USER
						window.location.href = "index.html";
					}
				);
			});
		});