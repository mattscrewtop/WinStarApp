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
			localStorage.setItem('OfferCode', offerCode);
			window.location.href = 'mobilePatronsBookNow.html';
		};


		$(document).ready(function ()
		{
			//SHOW PATRON INFORMATION
			mobilePatron.init();


			var offerIndex = 1;

			//MAKE 2 CALLS TO BACK END: SWEEPSTAKES AND OFFERS
			$.when
			(
				mobilePatron.GetSweepstakes().then(function (sweepstakesResultList)
				{
					console.log('SUCCESS - SWEEPSTAKES ALONE', sweepstakesResultList);
				}),
				mobilePatron.GetOffers().then(function (offersResultList)
				{					
					if (offersResultList)
					{
						for (var i = 0; i < offersResultList.length; i++)
						{
							var startDate = moment(offersResultList[i].startField, "YYYYMMDD");
							var endDate = moment(offersResultList[i].endField, "YYYYMMDD");
							var offerName = 'Offer #' + parseInt(offerIndex) + ': ' + offersResultList[i].textField;
							var offerDate = 'Offer valid ' + startDate.format("MMMM DD, YYYY") + ' - ' + endDate.format("MMMM DD, YYYY");
							var offerCode = offersResultList[i].codeField;
							var showButton = ((offerCode.charAt(0).trim().toUpperCase() === 'U') || (offerCode.charAt(0).trim().toUpperCase() === 'P'));
							var onClick = "onBookNowClick('" + offerCode + "')";

							if (showButton)
							{
								$("#OffersContainer table").append('<tr><td><b>' + offerName + '</b></td><td><button class="redeemButton" onclick="' + onClick +'">BOOK NOW</button></td></tr>');
							}
							else
							{
								$("#OffersContainer table").append('<tr><td colspan="2"><b>' + offerName + '</b></td></tr>');
							}

							$("#OffersContainer table").append('<tr><td>' + offerDate + '</td><td><h4>' + offerCode + '</h4></td></tr>');
							$("#OffersContainer table").append('<tr><td colspan="2"><hr/></td></tr>');

							offerIndex++;
						}
					}
				}),
				mobilePatron.GetPowerRewards().then(function (powerRewardsList)
				{					
					if (powerRewardsList)
					{
						for (var i = 0; i < powerRewardsList.length; i++)
						{
							var startDate = moment(powerRewardsList[i].startDateField, "YYYYMMDD");
							var endDate = moment(powerRewardsList[i].endDateField, "YYYYMMDD");
							var offerName = 'Offer #' + parseInt(offerIndex) + ': ' + powerRewardsList[i].textField;
							var offerDate = 'Offer valid ' + startDate.format("MMMM DD, YYYY") + ' - ' + endDate.format("MMMM DD, YYYY");
							var offerCode = powerRewardsList[i].codeField;
							var showButton = ((offerCode.charAt(0).trim().toUpperCase() === 'U') || (offerCode.charAt(0).trim().toUpperCase() === 'P'));
							var onClick = "onBookNowClick('" + offerCode + "')";

							if (showButton)
							{
								$("#OffersContainer table").append('<tr><td><b>' + offerName + '</b></td><td><button class="redeemButton" onclick="' + onClick +'">BOOK NOW</button></td></tr>');
							}
							else
							{
								$("#OffersContainer table").append('<tr><td colspan="2"><b>' + offerName + '</b></td></tr>');
							}

							$("#OffersContainer table").append('<tr><td>' + offerDate + '</td><td><h4>' + offerCode + '</h4></td></tr>');
							$("#OffersContainer table").append('<tr><td colspan="2"><hr/></td></tr>');

							offerIndex++;
						}
					}
				})
			).then
			(
				function ()
				{
					//HIDE SPINNER
					mobilePatron.HideActivity();
				},
				function (sweepstakesError, offersError)
				{
					//console.log('ERROR - SWEEPSTAKES YOYO 3', sweepstakesError);
					//console.log('ERROR - OFFERS YOYO 3', offersError);

					//HIDE SPINNER
					mobilePatron.HideActivity();

					//if (sweepstakesError)
					//{
					//	alertify.alert(sweepstakesError.responseJSON.ErrorTitle, sweepstakesError.responseJSON.ErrorDetail);
					//}

					//if (offersError)
					//{
					//	alertify.alert(offersError.responseJSON.ErrorTitle, offersError.responseJSON.ErrorDetail);
					//}
				}
			);
		});