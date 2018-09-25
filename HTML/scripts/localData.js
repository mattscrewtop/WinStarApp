function Factive(a)
{
	$my.footermenu.find(".active").removeClass("active");
	//$my.footermenu_contactus.addClass("active");
	//var o = new Object;
	//o = $my['footer_'+a];
	//o.addClass("active");
	(typeof $my['footer_' + a] !== "undefined" && $my['footer_' + a] !== null) ? $my['footer_' + a].addClass("active") : false;
}

function Sactive(a)
{
	$my.sidebarmenu.find(".selected-nav").attr('class', 'unselected-nav');
	$my.sidebarmenu.find(".selected-sub-nav").attr('class', 'unselected-sub-nav');
	//$my.sidebarmenu_contactus.attr('class', 'selected-nav');
	//var o = new Object;
	//o = $my["$my.sidebarmenu_"+a];
	//o.attr('class', 'selected-nav');
	//if ($my.debug) console.trace(' a: ' + a);
	(typeof $my['sidemenu_' + a] !== "undefined" && $my['sidemenu_' + a] !== null) ? $my['sidemenu_' + a].attr('class', 'selected-nav') : false;
	//if ($my.debug) console.trace('ClassName after: ' + $my['sidemenu_'+a].attr('class') + ' a: ' + a);
}

function Subactive(a)
{
	$my.sidebarmenu.find(".selected-nav").attr('class', 'unselected-nav');
	$my.sidebarmenu.find(".selected-sub-nav").attr('class', 'unselected-sub-nav');
	//var o = new Object;
	//o = $my["$my.sidebarmenu_"+a];
	//o.attr('class', 'selected-sub-nav');
	(typeof $my['sidemenu_' + a] !== "undefined" && $my['sidemenu_' + a] !== null) ? $my['sidemenu_' + a].attr('class', 'selected-sub-nav') : false;
}

function SBactive(a)
{
	if ($my.debug) console.trace('Before Side: ' + $my.deploy_span.attr('class'));
	//if ($my.DeploySpan.attr('class') == 'deploy-'+a) return false;
	//else $my.DeploySpan.attr('class', 'deploy-'+a);
	if ($my.debug) console.trace('Before Side: ' + $my.deploy_span.attr('class'));
}

function showActivityTimed(animationlength, fadeoutlength)
{
	//if ($my.debug) console.trace("ShowActivity");
	$my.status.show();
	$my.preloader.show();
	$my.status.delay(animationlength).fadeOut("slow"); // will first fade out the loading animation
	$my.preloader.delay(fadeoutlength).fadeOut("slow"); // will fade out the white DIV that covers the
}

function showActivity()
{
	$my.status.show();
	$my.preloader.show();
}
function hideActivity()
{
	$my.status.fadeOut("slow"); // will first fade out the loading animation
	$my.preloader.fadeOut("slow"); // will fade out the white DIV that covers the
}

//showActivityTimed(2000, 1500);
/*Note -- Need to get rid of fireEvent 
			http://www.tidev.io/2014/09/10/the-case-against-ti-app-fireevent-2/
			or
			http://tritarget.org/blog/2013/06/20/rolling-your-own-event-dispatcher-for-titanium/

		*/
var Ti = window.parent.Ti;
var scanNumber = 0;

function doAuthLogin()
{
	//LOG USER OUT
	localStorage.clear();

	//REDIRECT TO LOGIN PAGE
	window.location.href = "login.html";
}

function doLaunchScan()
{
	//showActivityTimed(1500, 1000);
	showActivity();
	thisLaunchScan();
	return false;
}

function thisLaunchScan()
{
	scanNumber++;
	if (typeof Ti !== 'undefined')
	{
		Ti.App.fireEvent('app:launchScan', {
			passback: ''
		});
	} else return;
}

function scanDone(passback)
{
	//var elementid = document.getElementById('myElement');
	//elementId.src = passback;
	if ($my.debug) console.trace("scanDone");
	////$my.carousel_wrapper.carousel( "resetCarousel" );
	moveToPage(3);
	window.location.reload(true);
	/*Task Go somewhere after scanDone*/
}

function doLaunchPhoneGet()
{
	//showActivity(1500,1000);
	thisPhoneGet();
	return false;
}

function thisPhoneGet()
{
	if (typeof Ti !== 'undefined')
	{
		Ti.App.fireEvent('app:getUDID', {
			passback: ''
		});
	} else return;
}

function getphoneUDID(passback)
{
	//var elementid = document.getElementById('myElement');
	//elementId.src = passback;
	if ($my.debug) console.trace("getphoneUDID");
	////$my.carousel_wrapper.carousel( "resetCarousel" );
	//moveToPage(3);
	//window.location.reload(true);
	/*Task Go somewhere after scanDone*/
	$my.phoneUDID = passback.UDID;
	alertify.success(passback.UDID);
}
var scanNumber = 0;

function doLaunchCamera(overlay)
{
	//showActivityTimed(1500, 1000);
	showActivity();
	thisLaunchCamera(overlay);
	return false;
}

function thisLaunchCamera(overlay)
{
	scanNumber++;
	if (typeof Ti !== 'undefined')
	{
		Ti.App.fireEvent('app:launchCamera', {
			passback: overlay
		});
	} else return;
}

function photoDone(passback)
{
	if ($my.debug) console.trace("photoDone");
	moveToPage(4);
	window.location.reload(true);
}

function openurl(urltoopen)
{
	//console.trace("BeforeOpen: " + urltoopen);
	if (typeof Ti !== 'undefined')
	{
		Ti.App.fireEvent('app:openAppURL', {
			passback: urltoopen
		});
	} else
	{
			if (urltoopen.indexOf("ttp:") > 0 || urltoopen.indexOf("ttps:") > 0 || urltoopen.indexOf("tel:") > 0)
				openNewTabOrNewWindow(urltoopen);
			else
				openNewURLInTheSameWindow(urltoopen);
	}
}
function loadhostpage()
{
	var urltoopen = 'mobilePatronsHostInformation.html';
	if (mobilePatron.HasHostFlag())
		openNewTabOrNewWindow(urltoopen);
	else
		alertify.alert('', 'You are not currently assigned a Casino Host. Be sure that you always play with your WinStar Club Passport card and play up to become eligible for exclusive offers and invitations.');
	
	}
function urlopened(passback)
{
	console.trace("urlopened: " + passback);
	//moveToPage(4);
	//window.location.reload(true);
}
// this function can fire onclick handler for any DOM-Element
function fireClickEvent(element)
{
	var evt = new window.MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true
	});

	element.dispatchEvent(evt);
}
// this function will setup a virtual anchor element
// and fire click handler to open new URL in the same room
// it works better than location.href=something or location.reload()
function openNewURLInTheSameWindow(targetURL)
{
	var a = document.createElement('a');
	a.href = targetURL;
	fireClickEvent(a);
}

function openNewTabOrNewWindow(targetURL)
{
	var a = document.createElement('a');
	a.href = targetURL;

	//a.target = '_system'; // now it will open new tab/window and bypass any popup blocker!
	a.target = '_blank'; // now it will open new tab/window and bypass any popup blocker!

	fireClickEvent(a);
}

function moveToPage(grouppage)
{
	
	//SLICK PAGES DO NOT EXIST IN DOM
	//LOAD INDEX PAGE THEN LOAD SLICK
	if ($('div.slick-list').length === 0)
	{
		localStorage.setItem('loadSlickIndex', grouppage);
		openurl("index.html");
		//window.location.href = "index.html";
	} 
	else
	{
		if (isNaN(grouppage))
		{
			if (typeof grouppage !== 'undefined')
			{
				if (Object.prototype.toString.call(someVar) === '[object Array]')
				{
					console.table(grouppage);
				} else
					grouppage();
				console.info()
				console.table(JSON.parse(grouppage));
			}
		} else
		{
			$my.responsive.slick('slickGoTo', parseFloat(grouppage));
		}
	}
}

function openBookingPage()
{
	var d = new Date();
	var sd = d.setDate(d.getDate() + 1);
	var strDay = d.getDate();
	var sm = d.setMonth(d.getMonth() + 1);
	var strMonth = d.getMonth();
	if (d.getMonth() == 0)
	{
		strMonth = 12;
		sm = d.setMonth(d.getMonth() - 1);
	}

	var todaydate = strMonth + "/" + strDay + "/" + d.getFullYear();
	openurl('http://www.winstarworldcasino.com/book/?id=booking&date-start=' + todaydate + '&qty-nights=1');
}

function resetSlides(home, previousIndex, currentIndex, nextIndex, lastIndex)
{ // (home, previousIndex, currentIndex, nextIndex, lastIndex)
	//var filterList = [home, previousIndex, currentIndex, nextIndex, lastIndex];
	$my.filterList = [home, previousIndex, currentIndex, nextIndex, lastIndex];
	//var filtered = false;
	if ($my.debug) console.trace("filterList: " + home + " " + previousIndex + " " + currentIndex + " " + nextIndex + " " + lastIndex);

	if (filtered === false)
	{
		if ($my.debug) console.trace("resetSlides");
		$my.responsive.slick('slickFilter', function (index)
		{
			var temp = $my.filterList.indexOf(index) > -1 ? index : -1;
			if ($my.debug) console.trace("resetSlides filterList: " + index + " filterList.indexOf: " + temp);
			return index === temp;
			//return index === jQuery.inArray(index, filterList);
		});
		filtered = true;
	} else
	{
		if ($my.debug) console.trace("resetSlides unFilter");
		$my.responsive.slick('slickUnfilter');
		filtered = false;
	}

}
/* clickeddetail */
function clickeddetail_orig(id, group)
{
	$my.detailId = id;
	if ($my.debug) console.trace("site.main.js clickeddetail 56 clickeddetail: " + id + " group: " + group);
	/*add slide */
	var innerHtml = ''
			+ '<div id="pages-99" class="pages">'
			+ '<div class="info-holder-main cfm">'
			+ '<h3 id="title-99">' + group + '</h3>'
			+ '<button type="button" name="cardclose-99" class="cardclose" onclick="javascript: cardClose(99);"></button>'
			+ '<div id="slide-99" class="slide-container">'
			+ '<div id="slides-99" class="slides"><div class="post">'
			+ '<ul id="items-99" class="items"></ul>'
			+ '</div></div>'
			+ '</div>'
			+ '</div>'
			+ '</div>';
	$my.responsive.slick('slickAdd', innerHtml);
	$my.responsive.slick('slickSetOption', 'swipe', false);
	//$my.responsive.slick('reinit');
	//$my.slides_99.scrollz({});
	$my.pages_99 = selectors.get('#pages-99', selectors.get('#responsive'), true);
	$my.slides_99 = selectors.get('#slides-99', selectors.get('#responsive'), true);
	$my.slide_99 = selectors.get('#slide-99', selectors.get('#responsive'), true);
	$my.title_99 = selectors.get('#title-99', selectors.get('#responsive'), true);
	$my.items_99 = selectors.get('#items-99', selectors.get('#responsive'), true);
	/*
			$my.slides_99.scrollz({
				pull : true
			});
			$my.slides_99.bind('pulled', function() {
				nextPageIndex = 0;
				loadDetail(group, id);
				if ($my.debug) console.trace("hidePullHeader: " + id);
				$my.slides_99.scrollz('hidePullHeader');
			});
			$my.slides_99.find('img').bind('mousedown', function(event) {
	            event.preventDefault();
	        });
	        $my.slides_99.scrollz('hidePullHeader');
	        */
	$my.slideCount++;
	if ($my.debug) console.trace("getDotCount: " + parseFloat($my.slideCount));
	$my.responsive.slick('slickGoTo', parseFloat($my.slideCount));
	//moveToPage(parseFloat($my.responsive.slick('getDotCount')));
	if ($my.debug) console.trace("site.main.js clickeddetail 56 clickeddetail: " + id + " group: " + group + " slideCount: " + $my.slideCount);
	//jQuery('#slides-99').scrollz('height', $(window).height() - 198);
}

function clickeddetail(id)
{
	$my.detailId = id;
	//$my.la.empty();
	/*add slide */
	var innerHtml = ''
			+ '<div id="slide-99" class="slide-container">'
			+ '<div id="slides-99" class="slides"><div class="post">'
			+ '<ul id="items-99" class="items"></ul>'
			+ '</div></div>'
			+ '</div>';
	//$my.la.html(innerHtml);
	//$my.pages_99 = selectors.get('#pages-99', selectors.get('#responsive'), true);


	//pre.style.margin = "-16px -16px -16px 0";
	//pre.style.paddingBottom = "24px";
	//pre.appendChild(document.createTextNode($('#la').html()));
	$my.la.html(innerHtml);
	$my.pages_99 = selectors.get('#pages-99', selectors.get('#la'), true);
	$my.slides_99 = selectors.get('#slides-99', selectors.get('#la'), true);
	$my.slide_99 = selectors.get('#slide-99', selectors.get('#la'), true);
	$my.title_99 = selectors.get('#title-99', selectors.get('#la'), true);
	$my.items_99 = selectors.get('#items-99', selectors.get('#la'), true);
	loadDetail($my.detailId);
	//$my['slides_' + $my.lastIndex].find('.img-box').off('click', function(e) {
	//console.log("unbind no click: " + $my.lastIndex);
	//e.preventDefault
	//});
	//show as confirm
	//var pre = document.createElement('div');
	//custom style.
	//pre.style.maxHeight = "444px";
	//pre.style.overflowWrap = "break-word";
	alertify.genericDialog || alertify.dialog('genericDialog', function ()
	{
		return {
			main: function (content)
			{
				this.setContent(content);
			},
			setup: function ()
			{
				return {
					options: {
						basic: true,
						maximizable: false,
						resizable: false,
						padding: false
					}
				};
			},
			settings: {
				selector: undefined
			}
		};
	});
	//force focusing password box
	//
	//reset();
	alertify.genericDialog($my.la[0]).set({
		frameless: true
	});
	//return false;
	$my.slideCount++;
}



function loadModal_orig(anchortext, slidecount)
{
	var appendthis = ("<div class='modal-overlay js-modal-close'></div>");
	//console.log("appedthis");
	(function ($)
	{
		$.fn.reBind = function (events, handler)
		{
			this.off(events, handler);
			this.on(events, handler);
			return this;
		};
	}(jQuery));
	//$(document).on('click', anchortext, function(e) {
	$my.items_99.reBind('click', 'a.detailimage', showDetail);
	//$my.anchortext.reBind('click', showDetail);

	function showDetail()
	{
		//e.preventDefault();
		var detailId = $(this).attr('data-detail-id');
		$my.detailId = detailId;
		//console.log('data-modal-id ' + detailId);
		loadDetail($my.detailId);
		$my.body.append(appendthis);
		$my.modal_overlay.fadeTo(500, 0.7);
		//$(".js-modalbox").fadeIn(500);
		//var modalBox = $(this).attr('data-modal-id');
		//$('#'+modalBox).fadeIn($(this).data());
		$my.la.fadeIn($(this).data());
	}

	$my.js_modal_close = selectors.get('.js-modal-close');
	$my.js_modal_close.click(function ()
	{
		$my.modal_box_modal_overlay.fadeOut(500, function ()
		{
			$my.modal_overlay.css("display", "none");
			//$my.modal_overlay.remove();
		});
	});
	$(window).resize(function ()
	{
		$my.modal_box.css({
			top: ($my.window.height() - $my.modal_box.outerHeight()) / 4,
			left: ($my.window.width() - $my.modal_box.outerWidth()) / 2
		});
	});
	$(window).resize();



	if ($my['countPages_' + slidecount] > 1)
	{
		var elementHeight = $(window).height();
		$my['slide_' + slidecount]
			.on('scrollstart', function (e)
			{
				$my.anchortext.reBind('click', void (0));
				//$(anchortext).off('click.disabled');
				//if(this.scrollTop > $my['slide_' + slidecount].offset().top + $my['items_' + slidecount].height() - elementHeight - 100 && !endReached) {
				//console.log("bottomreached");

				//console.info(this.scrollTop,$my['slide_' + slidecount].offset().top , $my['items_' + slidecount].height() , elementHeight, $my['slide_' + slidecount].offset().top + $my['items_' + slidecount].height() - elementHeight - 150);
				//loadMore(slidecount);
				//$my.responsive.slick("lazyLoad");
				//}
				return false;
			})
			.on('scrollstop', function (e)
			{
				$my.anchortext.reBind('click', showDetail);
			});

		// This is the magic, this gives me "live" scroll events
		//$my['slide_' + slidecount].on('gesturechange', function() {});
		//$my['slide_' + slidecount].bind('bottomreached', function() {
		//loadMore(slidecount);
		//});
	}



}
function cardClose(contentpage)
{

	if (contentpage == 99)
	{
		contentpage = $my.lastIndex;
		if ($my.debug) console.trace('SlideCount before Remove:' + $my.slideCount);
		//$my.slideCount = $my.responsive.slick('getDotCount') + 1;
		$my.responsive.slick('slickRemove', $my.slideCount, true);

		$my.responsive.slick('slickSetOption', 'swipe', true);
		$my.slideCount--;
		//console.trace('SlickRemove: ' + $my.slideCount);
		if ($my.debug) console.trace('SlideCount after Remove:' + $my.slideCount);
		$my.detailId = -1;
		$my.backIndex = 0;
	} else contentpage = $my.cardClose; ////////// xxxxxxxx

	if ($my.debug) console.trace("index: " + $my.currentIndex + " lastIndex: " + $my.lastIndex + " contentpage: " + contentpage);

	contentpage = 0;
	$my.currentIndex = contentpage;
	moveToPage(contentpage);
	if ($my.debug) console.trace("carousel-wrapper" + contentpage);
	//loadMore(sections_array[contentpage].page, contentpage);
	return false;
}
function mycardClose(contentpage)
{

	window.location.href = 'index.html';
	return false;
}
function slideClose(contentpage)
{

	if (contentpage == 99)
	{
		contentpage = $my.lastIndex;
		if ($my.debug) console.trace('SlideCount before Remove:' + $my.slideCount);
		//$my.slideCount = $my.responsive.slick('getDotCount') + 1;
		$my.responsive.slick('slickRemove', $my.slideCount, true);
		$my.slideCount--;
		//console.trace('SlickRemove: ' + $my.slideCount);
		if ($my.debug) console.trace('SlideCount after Remove:' + $my.slideCount);
		$my.detailId = -1;
		$my.backIndex = 0;
	} else contentpage = $my.cardClose; ////////// xxxxxxxx

	if ($my.debug) console.trace("index: " + $my.currentIndex + " lastIndex: " + $my.lastIndex + " contentpage: " + contentpage);


	$my.currentIndex = contentpage;
	moveToPage(contentpage);
	if ($my.debug) console.trace("carousel-wrapper" + contentpage);
	nextPageIndex = 0;
	//loadMore(contentpage);
	return false;
}
var objify = function() {
	    var rv = {};
        for (var i=0; i < arguments.length; i+=2)
        	rv[arguments[i]] = arguments[i+1];
        return rv;
};

function checkIfUserExists(userName) {
	var userRef = new Firebase('https://sweltering-inferno-2198.firebaseio.com/new_dev/log/MyWinStar');
	//var userRef = $my.logRef.child('MyWinStar');
	var exists = false;
	userRef.child(userName).once('value', function(snapshot) {
		exists = (snapshot.val() !== null);
		return exists;
	});
}

var writeLogItem = function(userName,functionName,resultSet) {
    // A post entry.

	var resultSet = (typeof resultSet !== 'undefined') ? resultSet : {0:"NA"};
	var functionName = (typeof functionName !== 'undefined') ? functionName : "NA";
	var userName = (typeof userName !== 'undefined') ? userName : "token";
	
	var ref = new Firebase('https://sweltering-inferno-2198.firebaseio.com/new_dev/log/MyWinStar');

    /*
    var menuItem = {
        logItem: {
        	functionName: logName,
        	results: [logString]
      	}
    };
    */
   if (userName == 'token')
   	userName = localStorage.getItem("userName");
   else
	localStorage.setItem('userName', userName);
	    var user = {};

	   	
	   	if (checkIfUserExists(userName) == false)
		{
			user[userName] = {"url":functionName,"results":resultSet};
	    	// Get a key for a new Post.
		   	var newUser = ref
	   			.update(user);
		}
		else
		{
			user = {"url":functionName,"results":resultSet};
			var childRef = ref.child(userName);
		   	var newItem = childRef
		   		.push(user);
		}
		
		/*
		ref.on('child_added', function(snapshot) {
			$my.key = snapshot.name();
		});
		*/

/*
    var menuItem = {
        functionName: [JSON.stringify(logString)]
    };
    // Get a key for a new Post.
    var newItem = ref
      .child('MyWinStar')
      .push(menuItem);
*/
};
