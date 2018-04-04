myslickEnabled = false;
$(document).ready(initPage);
$(window).load(loadPage);

		$(document).ready(function ()
		{
			var mobilePatron = new MobilePatron();

			$("form#frmLogin").submit(function (e)
			{
				e.preventDefault(); //prevent default form submit

				var data =
				{
					"UserName": $("#UserName").val(),
					"Password": $("#Password").val()
				};

				//SHOW SPINNER
				mobilePatron.ShowActivity();

				mobilePatron.DoLogin(data).then
				(
					function ()
					{
						//REDIRECT USER
						window.location.href = "mobilePatronsHome.html";
					},
					function (errorFromServer)
					{
						mobilePatron.HideActivity();

						//console.log('registration error:', errorFromServer);
						alertify.alert(errorFromServer.responseJSON.ErrorTitle, errorFromServer.responseJSON.ErrorDetail);
					}
				);
			});
		});