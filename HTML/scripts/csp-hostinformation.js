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
					for (var i = 0; i < 3; i++) 
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

			mobilePatron.GetHosts().then
			(
				function (jsonFromServer)
				{
					//console.log('hosts:', jsonFromServer);

					for (var i = 0; i < jsonFromServer.length; i++) 
					{
						var imageUrl = jsonFromServer[i].host_image;
						var hostName = jsonFromServer[i].host_name;
						var hostTitle = jsonFromServer[i].host_title;
						var contactInfoArray = jsonFromServer[i].contact_info;
						var hostInfo = jsonFromServer[i].host_info;

						var contactList = '<ul>';

						for (var j = 0; j < contactInfoArray.length; j++) 
						{
							contactList = contactList + '<li>' + contactInfoArray[j].contact_line + '</li>';
						}

						contactList = contactList + '</ul>';

						$("#casinoHostContainer table").append('<tr><td class="half-thumb"><img src="' + imageUrl + '"/></td>' +
																'<td><h2>' + hostName + '</h2>' +
																	'<h3>' + hostTitle + '</h3>'+ contactList  + hostInfo + '</td></tr>');
						$("#casinoHostContainer table").append('<tr><td colspan="2"><hr/></td></tr>');
					}
				},
				function (errorMessage)
				{

				}
			);
		});