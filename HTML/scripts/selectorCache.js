/*
*
*
*
*
Need to implement something similar to this from jQuery for exception Handling to keep the App from misbehavaing on something as simple as a timeout on an image download dtc.


setTimeout(function() {
    try {
        riskyFunc(function(err, msg) {
            // this will cover any asynchronous errors generated by
            // riskyFunc
            if(err) return console.error(err);
            console.log(msg);
        });
    } catch(e) {
        // riskyFunc threw an exception (not something it
        // invoked asynchronously)
        console.error(e);
    }
}

or

setTimeout(function() {
    try {
        riskyFunc(function(err, msg) {
            // this will cover any asynchronous errors generated by
            // riskyFunc
            if(err) return console.error(err);
            console.log(msg);
        });
    } catch(e) {
        // riskyFunc threw an exception (not something it
        // invoked asynchronously)
        console.error(e);
    }
}
The List
bugsense.com
jslogger.com
qbaka.com
muscula.com
errorception.com
exceptionhub.com
bugsnag.com
exceptional.io 
airbrake.io 
getsentry.com  

Other:
github.com/Offbeatmammal/jsErrLog - open source
github.com/occ/TraceKit - most comprehensive stacktrace library




app.getsentry.com //https://3e6db3a9f0de46eeaf6ae60eb57c6a50:5edd50ee418d440f8449118036864195@app.getsentry.com/45928
securty token: b3d450ae127511e5a3150025902d9efc







CSS Gradients
b3d450ae127511e5a3150025902d9efc

*/


/*
*
*
*
*
*
*


/* Old browsers fallback 
        background-color: #ff0000;
        background: url(images/red_gradient.png);
        background-repeat: repeat-x;
/* Browser specific syntax *
        background: -moz-linear-gradient(
         left, #fceabb 0%, #fccd4d 50%, #f8b500 51%, #fbdf93 100%);
        background: -Webkit-linear-gradient(
         left, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%);
        background: -o-linear-gradient(
         left, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%);
        background: -ms-linear-gradient(
         left, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%);
 /* Standard syntax *
        background: linear-gradient(
         to right, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%); 
*
*
*
*
*/

/*
function Selector_Cache() {
    var collection = {};

    function get_from_cache( selector ) {
        if ( undefined === collection[ selector ] ) {
            collection[ selector ] = $( selector );
        }

        return collection[ selector ];
    }

    return { get: get_from_cache };
}

var selectors = new Selector_Cache();
// Usage $( '#element' ) becomes
//selectors.get('#element");
*/

function Selector_Cache() {
    var elementCache = {};

    var get_from_cache = function(selector, $ctxt, reset) {

        if ('boolean' === typeof $ctxt) {
            reset = $ctxt;
        }
        var cacheKey = $ctxt ? $ctxt.selector + ' ' + selector : selector;

        if (undefined === elementCache[cacheKey] || reset) {
            elementCache[cacheKey] = $ctxt ? $ctxt.find(selector) : jQuery(selector);
        }

        return elementCache[cacheKey];
    };

    get_from_cache.elementCache = elementCache;
    return {
        get: get_from_cache
    };
}

var selectors = new Selector_Cache();


/*
var $window = selectors.get( window ),
    $document = selectors.get( document ),
    $images = selectors.get( 'img' );
    */
/*
// get selector
cache('#selector' );
 
// get selector and reset cache
cache('#selector', true );
 
// get selector with $ctxt
cache( 'img', cache('#selector' ) );
 
// get selector with $ctxt, and reset
cache( 'img', cache('#selector' ), true );
 
// get selector with $ctxt, and reset both selector and $ctxt (whoa)
cache( 'img', cache('#selector', true ), true );
*/
var $my = {};
//var rootRef = new Firebase('https://sweltering-inferno-2198.firebaseio.com');
var rootRef = new Firebase('https://sweltering-inferno-2198.firebaseio.com/dev_matt');
var myRef = rootRef.child("my");
var sectionsRef = rootRef.child("sections");
var logRef = rootRef.child("log");
var categoriesRef = sectionsRef.child("categories");
var sideMenuRef = sectionsRef.child("sidemenu_210");
var footerRef = sectionsRef.child("footermenu_210");
var maintenancePageRef = sectionsRef.child("maintenancePage");
//var slideList = {spotlight : 1, directions : 2, scaninstructions : 3, photoboothinstructions : 4, contactus : 5, entertainment : 6, promotions : 7, dining : 8, golf : 9, shareapp : 10, facilitymap : 11};
var winstar = winstar || {};
winstar.model = winstar.model || {};
winstar.model.my = function() {
    // need to implement http://backbonejs.org/ for truly dynamic data
    // Initialize all the queries you want to use more than once
    this.debug = false;
    this.appLoaded = false;
    this.phoneUDID = null;
    this.submenu_count = 0;
    this.currentdeploy = 'sidebar';
    this.currentfooter = 'spotlight';
    this.currentIndex = 0;
    this.currentsidemenu = 'home';
    this.detailId = -1;
    this.lastIndex = 0;
    this.nextIndex = 1;
    this.previousIndex = 0;
    this.slideCount = 0;
    this.deleteLog = false;
    this.removeElement = null;
    this.sectionsJSON = {};
    this.slideList = {};
    this.currentPageType = 'page';
    this.parent_sectionid = 0;
    this.sectionid = 0;
    this.cardClose = 0;
    this.pageSize = 10;
    this.alertify = {};
    this.maintenancePage = {};
    this.backIndex = 0;
    this.slideClose = false;
    this.uid = '';
    this.userToken = '';
    this.currentUser = {};
    this.authRef = {};

};

var winstar = winstar || {};
if (typeof snapper === "undefined" || snapper == 'null') {
    var snapper = new Snap({
        element: document.getElementById('snap-content'),
        dragger: null,
        disable: 'right',
        addBodyClasses: true,
        hyperextensible: false,
        resistance: 0.5,
        flickThreshold: 50,
        transitionSpeed: 0.3,
        easing: 'ease',
        maxPosition: 205,
        minPosition: 0,
        tapToClose: true,
        touchToDrag: false,
        slideIntent: 0, // degrees
        minDragDistance: 1000
    });
}
winstar.Controller = function() {

    var save = function(key, value) {

        var serialized = JSON.stringify(value);
        window.localStorage.setItem(key, serialized);
        return serialized.length;
    };

    var load = function(key) {

        var value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return null;
        }
    };

    var saveCompressed = function(key, value) {

        var compressed = LZString.compress(JSON.stringify(value));
        window.localStorage.setItem(key, compressed);
        return compressed.length;
    };

    var loadCompressed = function(key) {
        var value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(LZString.decompress(value));
        } else {
            return null;
        }
    };

    return {
        load: load,
        save: save,
        loadCompressed: loadCompressed,
        saveCompressed: saveCompressed
    };

};
//$(document).ready(initPage);

function initPage() {

        /*

            var scroll = document.querySelector('.scrollable');
            var stop = document.querySelector('.stop');
            var scrollTop = document.querySelector('.scrollTop');
         
            for (var i = 1; i <= 200; i++) {
                scroll.innerHTML += i + '\n';
            }

            stop.addEventListener('click', function() {
                scroll.style.overflow = 'hidden';
                setTimeout(function() {
                    scroll.style.overflow = '';
                }, 10);
            });
            
            scrollTop.addEventListener('click', function() {
                scroll.style.overflow = 'hidden';
                scroll.scrollTop = 0;
                setTimeout(function() {
                    scroll.style.overflow = '';
                }, 10);
            });
*/

        //var objAJAX = new AJAX();

        window.$winstar = {
            sectionsjson: {},
            slideList: {
                "spotlight": 1,
                "directions": 2,
                "scaninstructions": 3,
                "photoboothinstructions": 4,
                "contactus": 5,
                "entertainment": 6,
                "entertainment_venue": 7,
                "promotions": 8,
                "dining": 9,
                "golf": 10,
                "table-games": 11,
                "electronic-games": 12,
                "accommodations": 13,
                "meetings": 14,
                "shops": 15,
                "blog": 16,
                "shareapp": 17
            },
            mymaintenancePage: {
                "title": "Internet Connection Not Detected",
                "html_content": "<p>An Internet connection is needed to use this app, to get the most up to date information!</p>",
                "onOk": "OK"
            },
            myalertify: {
                "autoReset": true,
                "basic": false,
                "closable": true,
                "closableByDimmer": true,
                "frameless": false,
                "glossary": {
                    "cancel": "Cancel",
                    "ok": "OK",
                    "title": "WinStar"
                },
                "maintainFocus": true,
                "maximizable": true,
                "message": "",
                "modal": true,
                "movable": true,
                "notifier": {
                    "delay": 0,
                    "position": "bottom-left"
                },
                "overflow": true,
                "padding": true,
                "pinnable": true,
                "pinned": true,
                "resizable": true,
                "startMaximized": false,
                "theme": {
                    "cancel": "ajs-cancel",
                    "input": "ajs-input",
                    "ok": "ajs-ok"
                },
                "transition": "pulse",
                "type": {
                    "alert": {
                        "message": "",
                        "onok": " ",
                        "title": "Title Alert"
                    },
                    "confirm": {
                        "message": "This is a confirm2 example message!",
                        "oncancel": " ",
                        "onok": " "
                    },
                    "notifier": {
                        "callback": "function(){  console.log('dismissed'); }",
                        "delay": 5,
                        "dismiss": 0,
                        "dismissAll": 0,
                        "dismissOthers": 0,
                        "error": 0,
                        "message": "sample",
                        "notify": 0,
                        "ondismiss": 0,
                        "position": "top-right",
                        "push": {
                            "content": 0,
                            "wait": 0
                        },
                        "setContent": 0,
                        "success": 0,
                        "type": "success",
                        "warning": 0
                    },
                    "prompt": {
                        "message": "This is a prompt dialog",
                        "oncancel": " ",
                        "onok": "function(evt, value){ alertify.message('You entered: ' + value); }",
                        "value": "some value"
                    }
                }
            }
        };

        var dataRequests = [],
            controller = new winstar.Controller(),
            loadedFromPlain,
            loadedFromCompressed;

        var request = new winstar.model.my();
        request.sectionsJSON = window.$winstar.sectionsjson;
        request.slideList = window.$winstar.slideList;
        request.alertify = window.$winstar.myalertify;
        request.maintenancePage = window.$winstar.mymaintenancePage;

        dataRequests.push(request);
        var sizeOfCompressed = controller.saveCompressed("compressed", dataRequests);
        loadedFromCompressed = controller.loadCompressed("compressed");
        window.$my = loadedFromCompressed[0];

        window.$winstar = {
            sectionsjson: {},
            slideList: {},
            mymaintenancePage: {},
            myalertify: {}
        };
        $my.expandablenav = 0;
        $my.submenu_count = 0;
        $my.responsive = selectors.get('#responsive');
        $my.sidebarmenu = selectors.get('#sidebarmenu');
        $my.footermenu = selectors.get('#footermenu');
        $my.li_footer = selectors.get('li[id^="footer-"]');
        $my.preloader = selectors.get('#preloader');
        $my.status = selectors.get('#status');
        $my.spinner = selectors.get('#spinner');
        $my.close_nav = selectors.get('#sidebar-close');
        $my.deploy = selectors.get('#deploy');
        $my.deploy_span = selectors.get('#deploy-span');
        $my.infoMenu = selectors.get('#infoMenu');
        $my.my_header = selectors.get('#my-header');
        $my.pagepiling = selectors.get('#pagepiling');
        $my.sidebar = selectors.get('#sidebar');
        $my.snap_drawer = selectors.get('#snap-drawer');
        $my.snap_content = selectors.get('#snap-content');
        $my.la = selectors.get('#la');
        $my.img_box = selectors.get('.img-box');
        $my.htmlvar = selectors.get('html');
        $my.submenu_deploy = selectors.get('.submenu_deploy');
        $my.pages_99 = selectors.get('#pages-99', selectors.get('#la'), true);
        $my.slides_99 = selectors.get('#slides-99', selectors.get('#la'), true);
        $my.slide_99 = selectors.get('#slide-99', selectors.get('#la'), true);
        $my.title_99 = selectors.get('#title-99', selectors.get('#la'), true);
        $my.date_99 = selectors.get('#date-99', selectors.get('#la'), true);
        $my.items_99 = selectors.get('#items-99', selectors.get('#la'), true);
        $my.detail_99 = selectors.get('#items-99', selectors.get('#la'), true);
        $my.body = selectors.get('body');
        $my.modal_overlay = selectors.get('.modal-overlay');
        $my.js_modal_close = selectors.get('.js-modal-close', selectors.get('#la'), true);
        $my.js_modalbox = selectors.get('.js-modalbox', selectors.get('#la'), true);

        $my.action_footer = selectors.get('#action-footer', selectors.get('#la'), true);
        $my.modal_body = selectors.get('.modal-body', selectors.get('#la'), true);
        $my.modal_box_modal_overlay = selectors.get('.modal-box, .modal-overlay', selectors.get('#la'), true);
        $my.modal_box = selectors.get('.modal-box', selectors.get('#la'), true);

        $my.authRef = rootRef.child("users");
        $my.mywinstarhost = "http://dev.mobile-patron.solutiaconsulting.com/api";
        $my.userToken = "105,28,11,124,72,193,132,89,25,151,51,65,78,239,70,132,141,116,231,120,45,80,6,166,174,123,188,108,143,92,208,101,107,224,92,193,222,84,206,248,100,13,63,174,20,138,138,196,47,227,129,52,58,108,249,202,87,39,41,54,145,80,14,63,237,223,145,187,20,57,244,189,186,71,14,147,80,149,254,134,179,77,223,166,206,23,3,197,203,45,201,113,117,131,153,61,149,130,198,115,69,149,191,150,254,224,43,99,64,156,159,0,129,201,149,184,222,171,149,73,222,208,255,114,152,17,167,243,177,173,5,223,162,53,80,143,93,136,78,52,42,71,58,70,39,225,121,116,22,226,74,164,162,131,119,108,235,196,138,119,149,66,206,41,9,232,83,177,80,196,29,249,55,107,12,101,138,77,104,85,174,199,76,248,117,196,80,111,214,53,180,245,151,86,216,140,41,15,254,114,141,253,71,214,15,136,22,246,81,36,166,27,11,253,248,86,0,0,13,243,106,232,150,180,223,155,209,60,143,29,152,72,4,137,187,162,199,96,136,101,91,121,9,195,7,122,16,179,35,24,184,206,93,72,234,10";
        $my.currentUser = {};
        $my.iUserModel = {
            "CurrentUser": {},
            "Token": ""
        };
        $my.iOffer = {};
        $my.iPowerReward = { };
        $my.iSweepstake = {};
        $my.ISweepstakeDrawing = {};
        $my.iWinLosStatemnt = {};
        $my.iCompCashBalance = {};

        $my.output = selectors.get( "#output" );


        $my.window = selectors.get(window);
        $my.countPages_0 = 1;


        $my.anchortext = selectors.get('a.detailimage', selectors.get('#responsive'), true);

        myRef.on("value", function(snapshot) {
            myRef.child("alertify").orderByKey().on("child_added", function(mySnapShot) {
                $my.alertify[mySnapShot.key()] = mySnapShot.val();
            });

                if ($my.alertify.type.message.message.trim().length) {
                    alertify.message($my.alertify.type.message.message.trim(), $my.alertify.type.message.delay);
                }
                if ($my.alertify.type.alert.message.trim().length) {

					if (typeof $my.alertify.type.alert.onok.trim() !== "undefined" && $my.alertify.type.alert.onok.trim() !== null && $my.alertify.type.alert.onok.trim() !== "") {
						alertify.confirm().setting({
							'labels': {'ok': $my.alertify.type.alert.title.trim(), 'cancel': ""},
							'message': $my.alertify.type.alert.message.trim(),
							'title': "",
							'onok': function(){ openurl($my.alertify.type.alert.onok.trim()); },
							'frameless': false
						}).show();
					}
					else alertify.alert($my.alertify.type.alert.message.trim());
                    //alertify.alert($my.alertify.type.alert.title.trim(), $my.alertify.type.alert.message.trim(),$my.alertify.type.alert.onok.trim());
                } else if ($my.alertify.type.prompt.message.trim().length) {
                    //alertify.set('labels': {"ok": $my.alertify.glossary.ok, "cancel": $my.alertify.glossary.cancel} );
                    alertify.prompt($my.alertify.type.prompt.title.trim(), $my.alertify.type.prompt.message.trim(), $my.alertify.type.prompt.value.trim(), $my.alertify.type.prompt.onok.trim());
                } else if ($my.alertify.type.confirm.message.trim().length) {

                    alertify.confirm($my.alertify.type.confirm.message.trim(), $my.alertify.type.confirm.onok.trim(), $my.alertify.type.confirm.oncancel.trim());
                } else if ($my.alertify.type.notifier.message.trim().length)
                    alertify.notify($my.alertify.type.notifier.message.trim(), $my.alertify.type.notifier.type.trim(), $my.alertify.type.notifier.delay, $my.alertify.type.notifier.callback.trim());


        });
        footerRef.orderByKey().on("child_added", function(footerSnapShot) {
            loadfooterData(footerSnapShot.val());
        });



        $my.slides = selectors.get('.slides', selectors.get('#responsive'), true);
        $my.items = selectors.get('.items', selectors.get('#responsive'), true);
    }

(function($) {
    $.fn.reBind = function(events, handler) {
        if ($my.debug) console.trace("rebind");
        this.off(events, handler);
        this.on(events, handler);
        return this;
    };
}(jQuery));

function showDetail() {
    $my.text_box = selectors.get('div.scrollable', selectors.get('#items-99'), true);
    $my.modal_body.scrollTop(0);
    var detailId = $(this).attr('data-detail-id');
    $my.detailId = detailId;
    loadDetail($my.detailId);
    if ($my.debug) console.log(detailId);
    $my.modal_overlay.css("display", "block");
    if ($my.debug) console.log("displaydetailoverlay");
    $my.modal_overlay.stop(true).hide().fadeTo(500, 0.7);
    $my.la.stop(true).hide().fadeIn($(this).data());
    //$(window).resize();
    //console.log("LazyLoad_99 update");
    /*
    var myLazyLoad_99 = new LazyLoad({
        threshold: 500,
        container: document.getElementById('detail-99'),
        elements_selector: "img.scrollimage",
        throttle: 30,
        show_while_loading: false,
        class_loading: "bar-fill-stripes",
        class_loaded: "loaded"
    });
    */
    $my.modal_body.scrollTop(0);
}
$my.js_modal_close = selectors.get('.js-modal-close');
$my.js_modal_close.on('click', function() {
    $('.modal-box, .modal-overlay').fadeOut(500, function() {
        $my.modal_overlay.css("display", "none");
        if ($my.debug) console.log("hideoverlay");
        //$my.modal_overlay.remove();
    });

});
$(window).resize(function() {
    $my.modal_box.css({
        top: ($my.window.height() - $my.modal_box.outerHeight()) / 4,
        left: ($my.window.width() - $my.modal_box.outerWidth()) / 2
    });
});

function loadPage() {
    if ('ontouchstart' in window) {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    }

    //doLaunchPhoneGet();
    $my.htmlvar.addClass('JS');
    var    API = "http://winstarapp2.screwtopmedia.com/winstar/apiv2item.php?id=2202";
        //API = "https://register.winstarworldcasino.com";
    /*    Offline.options.checkOnLoad = false;
        Offline.options.interceptRequests = true;
        Offline.options.requests = false;
        /*
        Offline.options.reconnect = {
            initialDelay: 30,
            delay: (Offline.getOption('checks.xhr.timeout') / 30)
        };
        /
        Offline.options.reconnect = false;
        Offline.options.checks = {
            xhr: {
                url: API
            }
        };
        Offline.options.async = true;

        var
            $online = $('.online'),
            $offline = $('.offline');
            
        Offline.on('confirmed-down', function() {
            $online.fadeOut(function() {
                $offline.fadeIn();
            }); 
            //http://dev.mobile-patron.solutiaconsulting.com/swagger/ui/index
            //alertify.alert($my.maintenancePage.title.trim(), $my.maintenancePage.html_content.trim(), $my.maintenancePage.onOk.trim());
            alertify.alert($my.maintenancePage.title.trim(), $my.maintenancePage.html_content.trim(), $my.maintenancePage.onOk.trim());
        });

        Offline.on('confirmed-up', function() {
            $offline.fadeOut(function() {
                $online.fadeIn();
                //$my.responsive.slick('setPosition');
            });
            //alertify.alert($my.maintenancePage.title.trim(), $my.maintenancePage.html_content.trim(), $my.maintenancePage.onOk.trim());
                alertify.alert('We are Back', 'Welcome back to the WinStar App', 'Thanks!');
        });
    */
        //$online.fadeOut();
    $my.deploy.click(function() {
        if (snapper.state().state == "left") {
            snapper.close();
        } else {
            snapper.open('left');
        }
        return false;
    });

    $my.close_nav.click(function() {
        snapper.close();
    });

    $my.responsive.on('init reInit', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;

    });

    var slickOpts = {
        accessibility: true, // Enables tabbing and arrow key navigation
        arrows: true, // Prev/Next Arrows
        infinite: false,
        cssEase: 'ease',
        draggable: false
    };

    var slickEnabled = true;
    //if (typeof myslickEnabled !== "undefined" && myslickEnabled === false) slickEnabled = false;
    $my.slideCount = 0;
    if (slickEnabled) {
        $my.slidr = $my.responsive.slick(slickOpts);

        sideMenuRef.orderByKey().on("child_added", function(sidemenuSnapShot) {
            loadsideData(sidemenuSnapShot);

        });

            sideMenuRef.on("child_removed", function(snap) {
                   var slideKey = snap.key();
                   $my['fullnavitem_' + slideKey].remove();
            });
            sideMenuRef.on("child_changed", function(snap) {
                   loadsideData(snap, true);
                    var category = snap.val();
            });
        if (typeof myslickEnabled !== "undefined" && myslickEnabled === false) {
            //$.initLogin();
        } else {
        sideMenuRef.orderByChild("slickId").startAt(0).on("child_added", function(categorySnapShot) {
            var category = categorySnapShot.val();
            appLoadData(category.slickId);
            loadSlick(category.slickId);
        });
        maintenancePageRef.on("value", function(maintenancePageSnapShot) {
            $my.maintenancePage[maintenancePageSnapShot.key()] = maintenancePageSnapShot.val();
        });
    }
        hideActivity();
    } else {
        //$.initLogin();
    }
    function logElementEvent(eventName, element) {
        console.log(new Date().getTime(), eventName, element.getAttribute('data-original'));
    }

    function logEvent(eventName, elementsLeft) {
        console.log(new Date().getTime(), eventName, elementsLeft + " images left");
    }
    var myLazyLoad = {};
    $my.responsive.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        nextSlide = nextSlide ? nextSlide : 0;
        nextPageIndex = 0;
        endReached = false;
        loading = false;
        startIndex = 0;
        endIndex = recordCount;
        count = 0;
        winstars = "";
        pageTimestamp = 0;
        $my.lastIndex = currentSlide;
        $my.currentIndex = nextSlide;
        $my['items_' + currentSlide].empty();
        loadMore(nextSlide);

        Factive(nextSlide);
        Sactive(nextSlide);
        Subactive(nextSlide);
    });

    $my.responsive.on('afterChange', function(event, slick, currentSlide) {
        if (snapper.state().state == "right") {
            snapper.close();
        } else {
            snapper.open('right');
        }
        $my.lastIndex = currentSlide;
        var elementHeight = $(window).height();
        if ($my['countPages_' + currentSlide] > 1) {
            $my['slide_' + currentSlide]
                .on('scrollstart', function(e) {
                    if ($my.debug) console.log("scrollstart");
                    $('a.detailimage').reBind('click', void(0));
                })
                .on('scrollstop', function(e) {
                    if ($my.debug) console.log("scrollstop");
                    $('a.detailimage').reBind('click', showDetail);
                });


        }
    });
    /* orientationchange */
    $(window).on('orientationchange', function() {
        if ($my.debug) console.trace("OrientationChange " + $my.currentIndex);
        window.location.reload(true);
        if ($my.debug) console.trace("OrientationChange " + 'notdetails');
    });
    // Resize listener : auto resize
    $(window).resize(function() {
        // Compute content heights (between header and footer, if any) visible and full
        var headerHeight = 0;
        $my.my_header.each(function() {
            headerHeight += $(this).outerHeight();
        });
        var footerHeight = 0;
        $my.infoMenu.each(function() {
            footerHeight += $(this).outerHeight();
        });
        var visibleContentHeight = (window.innerHeight ? window.innerHeight : $(window).height()) - (headerHeight ? headerHeight : 0) - (footerHeight ? footerHeight : 0);
        if ($my.debug) console.trace("Resize: currentIndex " + visibleContentHeight);
    });
    if (typeof snapper !== 'undefined' && snapper != null) {
        if (snapper.state().state == "right") {
            snapper.close();
        } else {
            snapper.open('right');
        }
    }
        //LOAD SERVICE WORKER...
        if ('serviceWorker' in navigator) 
        {
            navigator.serviceWorker.register('service-worker.js')
            .then
            (
                function(registration) 
                {
                    console.log('Service Worker registered sparky', registration);
                }
            )
            .catch
            (
                function(err) 
                {
                    console.log('Service Worker registration failed yo: ', err);
                }
            );
        }
}

function onUpdateReady() {
    console.log('Found New Version!');
}
window.applicationCache.addEventListener('updateready', onUpdateReady);
if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
    onUpdateReady();
}
