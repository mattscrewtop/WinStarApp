/**
 * [appLoadData Slides]
 * @param  {[type]} slideList [description]
 * @return {[type]}           [description]
 */
function appLoadData(slickId) {
    var innerHtml = '';
    var ishome = '<div class="post">';
    var ishomeclose = '</div>';
    //$my.responsive.empty();
    //console.log(slickId);
    if (slickId === 0) {
        ishome = '';
        ishomeclose = '';
    }

    innerHtml = '' 
    + '<div id="pages-'+slickId+'" class="pages">'
    + '<div class="info-holder-main cfm">'
    + '<h3 id="title-'+slickId+'" class="title"></h3>'
    + '<button type="button" name="cardclose-'+slickId+'" class="cardclose" onclick="javascript: cardClose('+slickId+');"></button>'
    + '<div id="slide-'+slickId+'" class="slide-container slide scrollable">'
    + '<div id="slides-'+slickId+'" class="slides">'
    + ishome
    + '<ul id="items-'+slickId+'" class="items"></ul>'
    + ishomeclose
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';
    $my.responsive.slick("slickAdd", innerHtml);

    $my['pages_' + slickId] = selectors.get('#pages-' + slickId);
    $my['items_' + slickId] = selectors.get('#items-' + slickId);
    $my['slides_' + slickId] = selectors.get('#slides-' + slickId);
    $my['slide_' + slickId] = selectors.get('#slide-' + slickId);
    $my['title_' + slickId] = selectors.get('#title-' + slickId);
    $my['dataLoaded_' + slickId] = false;
    $my['dataDateTime_' + slickId] = 1426005062;


    $my['myLazyLoad_' + slickId] = new LazyLoad({
        threshold: 500,
        container: document.getElementById('items-' + slickId),
        elements_selector: "img.scrollimage",
        throttle: 30,
        show_while_loading: false,
            class_loading: "bar-fill-stripes",
            class_loaded: "loaded"
    });
    $my.slideCount++;
}

var last_parent_sectionid = -1;
var last_page = '';
var last_title = '';
var deploy = false;

function loadsideData(slideListData, childChanged) {
    var appendsideHtml = '';
    var sideHtml = '';
    //last_parent_sectionid = (typeof last_parent_sectionid === "undefined") ? -1 : last_parent_sectionid;
    //last_page = (typeof last_page === "undefined") ? '' : last_page;
    //last_title = (typeof last_title === "undefined") ? '' : last_title;
    //var last_parent_sectionid = -1;
    //var last_page = '';
    //var last_title = '';
    var slideCount = 0;
    //$my.submenu_count = 0;
    //for (var slide in slideList) {
    //var id = slide;
    //console.table(slideList);
    childChanged = typeof childChanged !== 'undefined' ? childChanged : false;
    if (childChanged) last_parent_sectionid = -1;
    var slideList = slideListData.val();
    var slideKey = slideListData.key();
    var slickId = slideList.slickId;
    var externalLink = slideList.externalLink;
    var linkclass = slideList.linkclass;
    var activeClass = slideList.activeClass;
    var sidemenu = slideList.sidemenu;
    var sidemenuIcon = slideList.sidemenuIcon;
    var footermenu = (typeof slideList.footermenu !== "undefined") ? slideList.footermenu : false;
    var footermenuIcon = slideList.footermenuIcon;
    var sectionid = slideList.sectionid;
    var parentSectionid = (typeof slideList.parent_sectionid !== "undefined" && slideList.parent_sectionid !== null) ? slideList.parent_sectionid : 0;
    var isActive = slideList.isActive;
    var isDevelopement = slideList.isDevelopement;
    var debug = slideList.debug;
    var startDate = slideList.startDate;
    var endDate = slideList.endDate;
    var sectionName = slideList.sectionName;
    var title = slideList.section_title;
    var pagetype = slideList.pagetype;
    var page = slideList.page;
    var internalLink = slideList.internalLink;
    if (slickId >= 0) var link = 'moveToPage(' + slickId + ')';
    else var link = '';
    if (pagetype === "section") link = "";
    var link_class = "unselected-nav";
    if (typeof externalLink !== "undefined" && externalLink !== null) {
        link = externalLink;
        link_class = "link-nav";
    }
    if (typeof internalLink !== "undefined" && internalLink !== null) {
        link = internalLink;
        link_class = "link-nav";
    }
    //console.info(parentSectionid,last_parent_sectionid,pagetype,title);
    if (sidemenu) {
        sideHtml = '';
        if (parentSectionid === 0 && last_parent_sectionid > 0 && pagetype != "section") {
            //console.info(title,"a");
            //alertify.error('finishsection');
				 		if (childChanged) sideHtml = '';
                        else sideHtml = '<span id ="fullnavitem-'+slideKey+'">';
			       		sideHtml +=   '<div class="sidebar-decoration"></div>'
                                + '<div class="nav-item">'
                                + '<a onclick="javascript: '+link+';" href="javascript:void(0);" class="sidemenu-'+page+' sidemenuitems">'+title+'<em id="sidemenu-'+slickId+'" class="' + link_class + '"> </em></a>' + '</div>';
        } else if (!parentSectionid && pagetype != "section") {
            //console.info(title,"b");
            //alertify.error('newnav');
            if (childChanged) sideHtml = '';
            else sideHtml = '<span id ="fullnavitem-'+slideKey+'">';
            sideHtml += '<div class="sidebar-decoration"></div>' + '<div class="nav-item">' + '<a onclick="javascript: ' + link + ';" href="javascript:void(0);" class="sidemenu-' + page + ' sidemenuitems">' + title + '<em id="sidemenu-' + slickId + '" class="' + link_class + '"> </em></a>' + '</div>';
        } else if (parentSectionid || pagetype == "section") {
            if (pagetype == "section") {
                deploy = false;
                //console.info(title,"c");
                //alertify.error('newsubnavheader');
                //
                $my.submenu_count++;
						if (childChanged) sideHtml = '';
                        else sideHtml = '<span id ="fullnavitem-'+slideKey+'">';
                            
	       		        sideHtml +=   '<div class="sidebar-decoration"></div>'
                                + '<div class="nav-item">'
                                + '<a href="javascript:void(0);" id="submenu-deploy-'+$my.submenu_count+'" class="sidemenu-'+page+' submenu-deploy sidemenuitems">'+title+'<em class="dropdown-nav"> </em></a>'
                                + '<div class="nav-item-submenu" id="nav-item-submenu-'+$my.submenu_count+'">'
                                + '<div class="sidebar-decoration"></div>'
                                + '</div>'
                                + '</div>';
                //+                 '<a onclick="javascript: '+link+';" href="javascript:void(0);" class="sidemenu-'+page+'">'+title+' <em id="sidemenu-'+slickId+'" class="unselected-sub-nav"> </em></a>';
            } else if (pagetype != "section") {

                //console.info(title,"d");
                //alertify.error('newsubnav');
                sideHtml = '';
                if (childChanged) appendsideHtml = '';
                else appendsideHtml = '<span id ="fullnavitem-'+slideKey+'">';
                appendsideHtml += '<a onclick="javascript: ' + link + ';" href="javascript:void(0);" class="sidemenu-' + page + ' sidemenuitems">' + title + ' <em id="sidemenu-' + slickId + '" class="unselected-sub-nav"> </em></a>';
            } else {
                //alertify.error('oops');
            }
        } else {
            //alertify.error('oopsb');
        }
    }
    last_parent_sectionid = parentSectionid;
    last_page = page;
    last_title = title;
    //}
    //console.log($my.submenu_count);
    //alertify.error(sideHtml);
    if (sideHtml.length > 0) {
        if (childChanged) $my['fullnavitem_' + slideKey].html(sideHtml);
        else {
            sideHtml += '</span>';
            $my.sidebarmenu.append(sideHtml);
        }
    }
    if (appendsideHtml.length > 0) {

        if (childChanged) $my['fullnavitem_' + slideKey].html(appendsideHtml);
        else {
            appendsideHtml += '</span>';
            $my.sidebarmenu.find('#nav-item-submenu-' + $my.submenu_count).append(appendsideHtml);
        }
    }
    //(typeof $my.SideMenu !== "undefined" && $my.SideMenu !== null) ? $my.SideMenu.html(sideHtml) : $my.SideMenu.html('test');
    //for (var slide in slideList) {
    //var id = slide;
    //var page = slideList.page;
    //var slickId = slideList.slickId;
    //if (slickId >= 0) {
    $my['sidemenu_' + slickId] = selectors.get('#sidemenu-' + slickId);

    $my['fullnavitem_' + slideKey] = selectors.get('#fullnavitem-' + slideKey);
    //}
    //$my['sidemenu_'+slickId] = $my['sidemenu_'+slickId);
    //}
    /*
    if (slickId === $my.slideCount - 1 && deploy == false) {
        tempcount = $my.submenu_count + 1;
        console.info("menu");
        console.info(slickId);
        console.info($my.slideCount);
        console.info(tempcount);
        for (j = 1; j <= tempcount; j++) {
            console.info(j);
            $my['submenu_deploy_' + j] = selectors.get('#submenu-deploy-' + j);
            $my['submenu_deploy_' + j].on('click', function() {
                jQuery(this).parent().find('.nav-item-submenu').toggle(100);
                jQuery(this).find('em').toggleClass('dropdown-nav');
                return false;
            });
        }
        deploy = true;
    }
    */
    if (slickId == -9) {
        $my.expandablenav = $my.expandablenav+1;
        //console.info($my.expandablenav);
    }
    if (slickId >= 0) $my.slideCount = $my.slideCount + 1;
            if ($my.expandablenav == 5 && $my.slideCount == 20 && deploy == false) {
                console.info($my.slideCount);
                for (j = 1; j <= $my.expandablenav; j++) {
                    //console.info(j);
                    $my['submenu_deploy_' + j] = selectors.get('#submenu-deploy-' + j);
                    $my['submenu_deploy_' + j].on('click', function() {
                        jQuery(this).parent().find('.nav-item-submenu').toggle(100);
                        jQuery(this).find('em').toggleClass('dropdown-nav');
                        return false;
                    });
                }
                deploy = true;
            }
}

function loadfooterData(slideList) {
    var footerHtml = '';
    var last_page = '';
    var last_title = '';
    //for (var slide in slideList) {
    //var id = slide;
    var slickId = slideList.slickId;
    var externalLink = slideList.externalLink;
    var linkclass = slideList.linkclass;
    var activeClass = slideList.activeClass;
    var sidemenu = slideList.sidemenu;
    var sidemenuIcon = slideList.sidemenuIcon;
    var sectionid = slideList.sectionid;
    var isActive = slideList.isActive;
    var isDevelopement = slideList.isDevelopement;
    var debug = slideList.debug;
    var startDate = slideList.startDate;
    var endDate = slideList.endDate;
    var sectionName = slideList.sectionName;
    var title = slideList.section_title;
    var pagetype = slideList.pagetype;
    var page = slideList.page;
    var internalLink = slideList.internalLink;
    var link = 'moveToPage(' + slickId + ')';
    if (page === "section") link = "";
    var ishome = '';
    var ishomeclose = '';
    if (typeof externalLink !== "undefined" && externalLink !== null) link = externalLink;
    if (typeof internalLink !== "undefined" && internalLink !== null) link = internalLink;

    if (footermenu) {
        footerHtml += ''
+ '<li id="footer-'+slickId+'">'
+ '<a onclick="javascript: '+link+';" class="'+page+'" href="javascript:void(0);"> <span class="name">'+title+'</span> </a>'
+ '</li>';
    }
    //}

    $my.footermenu.append(footerHtml);
    //for (var slide in slideList) {
    //var id = slide;
    //var slickId = slideList.slickId;
    $my['footer_' + slickId] = selectors.get('#footer-' + slickId);
    //}
    //(typeof $my.FooterMenu !== "undefined" && $my.FooterMenu !== null) ? $my.FooterMenu.html(footerHtml) : $my.FooterMenu = $my.defaultFooterMenu;
}

function loadmyData(slideList) {
    for (var slide in slideList) {
        var id = slide;
        var debug = slideList.debug;
        var pageSize = slideList.pageSize;
        var notificationMessage = slideList.notificationMessage;
    }
    //(typeof $my.FooterMenu !== "undefined" && $my.FooterMenu !== null) ? $my.FooterMenu.html(footerHtml) : $my.FooterMenu = $my.defaultFooterMenu;
}

/*****  Alertify ****/
//setTimeout(function(){alertify.myAlert("These can be triggered either from something the customer does or through a marketing campaign or just general app Info!");}, 30000);



/**** Alertify ****/


/*      var sideList = sideListArray.reduce(function(o, v, i) {
                o[i] = v;
                return o;
            }, {});

    
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments, 0);
}

var sideList = list(slideList); // [1, 2, 3]

var removed = sideList.splice(slideList.length);
console.table(removed);
*/
//$winstar.sections_array;
//$winstar.sections_array.sort(dynamicSortMultiple("sidemenu","-footermenu"));
/* This simple sort works the best
    $winstar.slideList.sort(function(a,b) {
        return a.sidemenu > b.sidemenu;
    });
*/
//console.table($winstar.slideList);
//swapElement(sideList,"slickId","sidemenu");
//console.table($winstar.sections_array);
/*
        for (var sideslideparttwo in $winstar.sections_array) {
            ishome = '<div class="post">';
            ishomeclose = '</div>';
            //alertify.error("Test");
            //alertify.error(sideslide);
            var sideIdparttwo = parseInt(sideslideparttwo);
            var slickId = (typeof $winstar.sections_array[sideIdparttwo].slickId !== "undefined") ? $winstar.sections_array[sideIdparttwo].slickId : false;
            var externalLink = $winstar.sections_array[sideIdparttwo].externalLink;
            var linkclass = $winstar.sections_array[sideIdparttwo].linkclass;
            var activeClass = $winstar.sections_array[sideIdparttwo].activeClass;
            var sidemenu = (typeof $winstar.sections_array[sideIdparttwo].sidemenu !== "undefined") ? $winstar.sections_array[sideIdparttwo].sidemenu : false;
            var sidemenuIcon = $winstar.sections_array[sideIdparttwo].sidemenuIcon;
            var footermenu = (typeof $winstar.sections_array[sideIdparttwo].footermenu !== "undefined") ? $winstar.sections_array[sideIdparttwo].footermenu : false;
            var footermenuIcon = $winstar.sections_array[sideIdparttwo].footermenuIcon;
            var sectionid = (typeof sectionid !== "undefined" && sectionid !== null) ? $winstar.sections_array[sideIdparttwo].sectionid : 0;
            //var parentSectionid = $winstar.sections_array[sideIdparttwo].parent_sectionid;
            var parentSectionid = (typeof parentSectionid !== "undefined" && parentSectionid !== null) ?  $winstar.sections_array[sideIdparttwo].parent_sectionid : 0;
            var isActive = $winstar.sections_array[sideIdparttwo].isActive;
            var isDevelopement = $winstar.sections_array[sideIdparttwo].isDevelopement;
            var debug = $winstar.sections_array[sideIdparttwo].debug;
            var startDate = $winstar.sections_array[sideIdparttwo].startDate;
            var endDate = $winstar.sections_array[sideIdparttwo].endDate;
            var sectionName = $winstar.sections_array[sideIdparttwo].sectionName;
            var title = $winstar.sections_array[sideIdparttwo].section_title;
            var pagetype = $winstar.sections_array[sideIdparttwo].pagetype;
            var page = $winstar.sections_array[sideIdparttwo].page;
            var internalLink = $winstar.sections_array[sideIdparttwo].internalLink;
            var link = 'moveToPage('+slickId+')';
            //if (slickId === -4) console.table($winstar.sections_array[sideIdparttwo]);
            if (page == "section") link = "void(0)";
            if (typeof externalLink !== "undefined" && externalLink !== null) link = externalLink;
            if (typeof internalLink !== "undefined" && internalLink !== null) link = internalLink;

           last_parent_sectionid = parentSectionid;
           last_page = page;
           last_title = title;
            
        }
        
        if (typeof $my.SideMenu === "undefined" || $my.SideMenu == 'null') {
                $my.SideMenu = jQuery("#sidebarmenu");
                var rootRef = new Firebase('https://sweltering-inferno-2198.firebaseio.com/sections/config');
                rootRef.on('value', function(snapshot) {
                    var queryCategoryRef = rootRef.orderByChild("sidemenu");
                    var sectionsjson = [];
                    queryCategoryRef.on("value", function(querycategorySnapshot) {
                        var sError = null;
                        var i = 0;
                        querycategorySnapshot.forEach(function(querycategoryData) {
                            if (querycategoryData.val().sidemenu >= 0) {
                                sectionsjson[i] = querycategoryData.val();
                                i++;
                            }
                        });
                    });
                    var querySideMenuRef = rootRef.orderByChild("slickId");
                    var slideList = [];
                    var j = 0;
                    querySideMenuRef.on("value", function(querySideMenuSnapshot) {
                        querySideMenuSnapshot.forEach(function(querySideMenuData) {
                            if (querySideMenuData.val().slickId > 0) {
                                slideList[j] = querySideMenuData.val();
                                j++;
                            }
                        });
                    });
                    $my =
                    {
                        // need to implement http://backbonejs.org/ for truly dynamic data
                        // Initialize all the queries you want to use more than once
                        debug: true,
                        appLoaded: false,
                        phoneUDID: null,
                        footermenu: selectors.get('li[id^='footer-']"),
                        ActivityPreloader: selectors.get('#preloader"),
                        ActivityStatus: selectors.get('#status"),
                        close_nav: selectors.get('#close-nav, #sidebar-close'),
                        Deploy: selectors.get('#deploy'),
                        DeploySpan: selectors.get('#deploy-span'),
                        FooterMenu: $my.footermenu,
                        infoMenu: selectors.get('#infoMenu'),
                        my_header: selectors.get('#my-header'),
                        pagepiling: selectors.get('#pagepiling'),
                        responsive: $my.responsive,
                        sidebar: selectors.get('#sidebar'),
                        snap_drawer: selectors.get('#snap-drawer'),
                        SideMenu: $my.sidebarmenu,
                        submenu_deploy: selectors.get('.submenu-deploy'),
                        slides: selectors.get('.slides'),
                        items: selectors.get('.items'),
                        online: selectors.get('.online'),
                        offline: selectors.get('.offline'),
                        currentdeploy: 'sidebar',
                        currentfooter: 'spotlight',
                        currentIndex: 0,
                        currentPageType: 'page',
                        parent_sectionid: 0,
                        currentsidemenu: 'home',
                        detailId: -1,
                        lastIndex: 0,
                        nextIndex: 1,
                        previousIndex: 0,
                        slideCount: 0,
                        deleteLog: false,
                            removeElement: null

                    };
        }
        */
//$my.SideMenu.html(sideHtml);
//$my.slideCount = $my.responsive.slick('getDotCount')+1;
//loadMore('home', 0);
/*
    function swapElement(array, indexA, indexB) {
        var tmp = array[parseInt(indexA)];
        array[indexA] = array[parseInt(indexB)];
        array[indexB] = tmp;
    }
    
function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr; // returns array
}



function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(objTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
*/
/*
    function loadSlide(id, group) {
        ishome = '<div class="post">';
        ishomeclose = '</div>';
        alertify.error("Test");
        if (id == 0) {
            ishome = '';
            ishomeclose = '';
            alertify.error("IsHome");
        }
        var innerHtml = ''
        +   '<div id="pages-'+id+'" class="pages">'
        +       '<div class="info-holder-main cfm">'
        +           '<h3 id="title-'+id+'" class="title"></h3>'
        +           '<button type="button" name="cardclose-'+id+'" class="cardclose" onclick="javascript: cardClose('+id+');"></button>'
        +           '<div id="slide-'+id+'" class="slide-container slide">'
        +               '<div id="slides-'+id+'" class="slides" data-scrollz="simple">'
        +                   ishome
        +                       '<ul id="items-'+id+'" class="items"></ul>'
        +                   ishomeclose
        +               '</div>'
        +           '</div>'
        +       '</div>'
        +   '</div>';
        jQuery('#responsive').slick('slickAdd',innerHtml, false);
        
        $my['footermenu_'+id] = $my['footermenu_'+id);
        $my['item_holder_'+id] = $my['items_'+id);
        $my['sidemenu_'+id] = $my['sidemenu_'+id);
        $my['slides_'+id] = $my['slides_'+id);
        $my['slide_'+id] = $my['slide_'+id);
        $my['title_'+id] = $my['title_'+id);
        $my['dataLoaded_'+id] = false;
        $my['dataDateTime_'+id] = 1426005062;
    }
*/
/**
 * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
 * on host objects like NamedNodeMap, NodeList, and HTMLCollection
 * (technically, since host objects have been implementation-dependent,
 * at least before ES6, IE hasn't needed to work this way).
 * Also works on strings, fixes IE < 9 to allow an explicit undefined
 * for the 2nd argument (as in Firefox), and prevents errors when
 * called on other DOM objects.
 */
/*
(function () {
  'use strict';
  var _slice = Array.prototype.slice;

  try {
    // Can't be used with DOM elements in IE < 9
    _slice.call(document.documentElement);
  } catch (e) { // Fails in IE < 9
    // This will work for genuine arrays, array-like objects, 
    // NamedNodeMap (attributes, entities, notations),
    // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
    // and will not fail on other DOM objects (as do DOM elements in IE < 9)
    Array.prototype.slice = function(begin, end) {
      // IE < 9 gets unhappy with an undefined end argument
      end = (typeof end !== 'undefined') ? end : this.length;

      // For native Array objects, we use the native slice function
      if (Object.prototype.toString.call(this) === '[object Array]'){
        return _slice.call(this, begin, end); 
      }

      // For array like object we handle it ourselves.
      var i, cloned = [],
        size, len = this.length;

      // Handle negative value for "begin"
      var start = begin || 0;
      start = (start >= 0) ? start : Math.max(0, len + start);

      // Handle negative value for "end"
      var upTo = (typeof end == 'number') ? Math.min(end, len) : len;
      if (end < 0) {
        upTo = len + end;
      }

      // Actual expected size of the slice
      size = upTo - start;

      if (size > 0) {
        cloned = new Array(size);
        if (this.charAt) {
          for (i = 0; i < size; i++) {
            cloned[i] = this.charAt(start + i);
          }
        } else {
          for (i = 0; i < size; i++) {
            cloned[i] = this[start + i];
          }
        }
      }

      return cloned;
    };
  }
}());
*/
