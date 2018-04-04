		var myslickEnabled = false;
		$(document).ready(initPage);
		$(window).load(loadPage);

		if ('ontouchstart' in window)
		{
			window.FastClick.attach(document.body);
		}

		var mobilePatron = new MobilePatron();


		$(document).ready(function ()
		{
			
			mobilePatron.GetVipEvents().then
			(
				function (jsonFromServer)
				{
					for (var i = 0; i < jsonFromServer.length; i++) 
					{
						var title = jsonFromServer[i].event_title;
						var thumbImage = jsonFromServer[i].event_thumb_image;
						var fromDate = moment(jsonFromServer[i].event_from_date);
						var toDate = moment(jsonFromServer[i].event_to_date);
						var content = jsonFromServer[i].event_info;
						var url = jsonFromServer[i].event_url;

						$('#vipEventsContainer').append('<dl class="vipEventList">' +
							'<dd><h3>' + title + '</h3></dd>' +
							'<dd><img src="' + thumbImage + '"/></dd>' +
							'<dd>' + fromDate.format('MM/DD/YYYY') + ' - ' + toDate.format('MM/DD/YYYY') + '</dd>' +
							'<dd>' + content + '</dd>' +
							'<dd><a target="_blank" href="' + url + '">More Details</a></dd></dl>');
					}
				},
				function (errorMessage)
				{

				}
			);
		});