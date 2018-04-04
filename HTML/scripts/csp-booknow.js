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


		function onBookNowClick(offerCode)
		{
			console.log('offerCode:', offerCode);
		};


		$(document).ready(function ()
		{
			var offerCode = undefined;

			//IF OFFER CODE EXISTS (USER SELECTED OFFER CODE IN mobilePatronsOffers.html
			if (localStorage.getItem("OfferCode"))
			{
				offerCode = localStorage.getItem("OfferCode");

				console.log('selected offer code:', offerCode);

				//SHOW SPINNER
				mobilePatron.HideActivity();
			}
			else
			{
				window.location.href = 'mobilePatronsOffers.html';
			}

		
			$("form#frmBookNow").submit(function (e)
			{
				e.preventDefault(); //prevent default form submit

				var patronNumber = $('#PassportCardNumber').val();
				var zipCode = (mobilePatron.CurrentUser && mobilePatron.CurrentUser.Zip) ? mobilePatron.CurrentUser.Zip : '';
				var nightCount = $('#NightsCount').val();
				var adultCount = $('#AdultCount').val();
				var childCount = $('#ChildrenCount').val();
				var checkInDate = moment($('#CheckInDate').val()).format('YYYYMMDD');				

				var bookNowUrl = 'https://secure.winstarworldcasino.com/WinstarTools/CheckOffer?patron='+ patronNumber + '&zip=' + zipCode + '&offer=' + offerCode + '&nights=' + nightCount + '&adults=' + adultCount + '&children=' + childCount + '&resDate=' + checkInDate;

				console.log('bookNowUrl:', bookNowUrl);

				window.location.href = bookNowUrl;
			});
		});