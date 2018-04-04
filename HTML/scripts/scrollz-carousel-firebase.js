 // Next page index loaded
 var nextPageIndex = 0;

 // Indicates if new entries loading is in progress
 var loading = false;
 var endReached = false;
 var recordCount = 11;
 var startIndex = 0;
 var endIndex = recordCount;
 var count = 0;
 var winstars = "";
 var pageTimestamp = 0;
 var targetList = $my.items_0;
 var internalcount = 0;

 function loadSlick(slidecount) {
     $my['dataLoaded_' + slidecount] = true;
     $my['dataDateTime_' + slidecount] = Date.now();
     $my['refsection_' + slidecount] = categoriesRef.child(slidecount);
     $my['refpages_' + slidecount] = $my['refsection_' + slidecount].child("pages");

     $my['refsection_' + slidecount].on('value', function(pagescontent) {
         var grouppage = pagescontent.val();
         $my['countPages_' + slidecount] = pagescontent.child('pages').numChildren();
         var i = slidecount;
         var pagetype = grouppage.pagetype;
         $my['pagetype_' + slidecount] = pagetype;
         var category_title = grouppage.category_title;
         typeof $my['title_' + slidecount] === 'undefined' ? i = i : $my['title_' + slidecount].html(category_title);
     });
     if (slidecount === 0) {
         nextPageIndex = 0;
         loading = false;
         startIndex = 0;
         endIndex = 0;
         endReached = false;
         //typeof $my.items_0 ? $my['items_0'].empty() : jQuery('#items-0').empty();
         $my.modal_overlay.css("display", "none");
         loadMore(0);
     }
 }

 function loadMore(slidecount) {

     if (!loading && !endReached) {
         loading = true;
         var currentTimeStamp = parseInt(Date.now() / 1000);

         if (typeof $my['items_' + slidecount] === "undefined") {
             targetList = selectors.get('#items-' + slidecount);
         } else
             targetList = $my['items_' + slidecount];

             //console.table("startIndexa: " + startIndex);
         if (nextPageIndex === 0) {
             startIndex = currentTimeStamp;
             endIndex = recordCount;
             winstars = "";
             pageTimestamp = 0;
             endReached = false;
             targetList.empty();
             //console.table("startIndexb: " + startIndex);
         } else if (nextPageIndex > 0) {
             startIndex = pageTimestamp;
             endIndex = recordCount;
             //console.table("startIndexc: " + startIndex);
             if ($my['countPages_' + slidecount] >= nextPageIndex + recordCount) {} else {
                 endIndex = $my['countPages_' + slidecount] - nextPageIndex + 1;
             }
         }
         if ($my['countPages_' + slidecount] < endIndex) {
             endReached = true;
             endIndex = $my['countPages_' + slidecount];
         }
         if ($my['countPages_' + slidecount] === 1) {
             //console.table("startIndexd: " + startIndex);
             startIndex = 0;
             endIndex = 1;
         }
         internalcount = 0;
         if (slidecount === 0) startIndex = 0;
             //console.table("startIndexe: " + startIndex);
         //$my['refpages_'+slidecount].orderByKey().startAt(JSON.stringify(startIndex)).limitToFirst(endIndex).on('child_added', function(snapcontent) {
         $my['refpages_' + slidecount].orderByKey().startAt(JSON.stringify(startIndex)).on('child_added', function(snapcontent) {
             var pageRef = $my['refpages_' + slidecount].child(startIndex);
             listitem(snapcontent);
             if (internalcount === 0 && nextPageIndex > 0) nextPageIndex--;
             nextPageIndex++;
             internalcount++;
         });
         $my['myLazyLoad_' + slidecount].update();
         $('a.detailimage').reBind('click', showDetail);
         loading = false;
         if (endIndex < recordCount || nextPageIndex >= $my['countPages_' + slidecount]) endReached = true;
     }
 }

 function updatelistitem(pageid, pagekey, pageval) {
     jQuery('#listitem-' + pageid).parent.empty();
 }

 function listitem(pagecontent) {
     //if (nextPageIndex === 0) targetList.empty();
     var el = pagecontent.val();
     var elkey = pagecontent.key();
     $my.parent_sectionid = el.parent_sectionid;
     pageTimestamp = el.pageTimestamp;
     var firebasePage = 0;
     if (el.pagetype == "page") {
         firebasePage = el.pageid;
                    winstars = "<li id='listitemid-" + firebasePage + "' data-pageid='" + firebasePage + "'>" + el.content.replace("src=", "class='scrollimage' data-original=") + "</li>";
         category_title = el.category_title;
         endReached = true;
     } else {
         firebasePage = el.pageTimestamp;
         var date = typeof el.to_date === 'undefined' ? "" : el.to_date;
         var dateArray = date.length > 0 ? date.split(" ") : [];
         date = dateArray[0];
         var title = el.title;
         var img = el.feature_image;
         var thumb_image = el.thumb_image;
         var feature_image = el.feature_image;
         var wide_image = el.wide_image;
         var content = el.content;
         var html_content = JSON.stringify(el.html_content);
         var url = el.url;
         var category = el.category;
         var id = el.pageid;
         var section_title = el.section_title;
         category_title = el.category_title;
         var pagetype = el.pagetype;
         var event_time = typeof el.event_time === 'undefined' ? "" : el.event_time;
         var how_often_recurring = typeof el.how_often_recurring === 'undefined' ? "" : el.how_often_recurring;
         var from_date = typeof el.from_date === 'undefined' ? "" : el.from_date;

         var itemdate = "";
         var itempubDate = "";
         var wordcount = 15;
                     //console.log("date: " + date);
         if (typeof date === 'undefined' || date == null) {
             date = "";
             html_content = "<p>Please check back later</p>";
         } else {
             if (date.length > 0 && date !== '2099-01-01') {
                 var myDate = new Date(date);
                 var n = myDate.getTimezoneOffset();
                 var nd = myDate.setHours(myDate.getHours() + (n / 60));
                 if (how_often_recurring.length === 0) {
                     itemdate = "<em class='date'>" + myDate.format('D, M jS, Y') + " " + event_time + "</em>";
                     itempubDate = myDate.format('Y-m-d h:i:s');
                 } else {
                     how_often_recurring = how_often_recurring.replace(/<\/br>/g, '');
                     var dateArray = from_date.split(" ");
                     from_date = dateArray[0];
                     var myfromDate = new Date(from_date);
                     var n = myfromDate.getTimezoneOffset();
                     var nd = myfromDate.setHours(myfromDate.getHours() + (n / 60));
                     itemdate = "<em class='date'>" + how_often_recurring + "<br/>From: " + myfromDate.format('D, M jS, Y') + "<br/>To: " + myDate.format('D, M jS, Y') + "</em>";
                 }
             }
         }
         if (html_content.length > 0) {

             hilight = "";
             if (itemdate.length === 0) hilight = "<div class='hilight'><a id='textanchor-" + firebasePage + "' class='detailimage' href='javascript:void(0);' data-modal-id='slide-99' data-detail-id='" + firebasePage + "'><h2>" + title + "</h2></a></div>";
             else hilight = "<div class='hilight'>" + itemdate + "</div>";
             if (feature_image !== 'https://winstar.chickasawwebsites.com/wp-content/uploads/2015/08/dining-header-1265x350.jpg' && feature_image.length > 0) {
                winstars = "<li id='listitemid-" + firebasePage + "' data-pageid='" + firebasePage + "'><div data-detail-id='" + firebasePage + "' class='img-box' id='div-img-" + firebasePage + "' ><div class='image promo'><a id='anchor-" + firebasePage + "' class='detailimage' href='javascript:void(0);' data-modal-id='slide-99' data-detail-id='" + firebasePage + "'>";
                winstars += "<span class='bar-unfill'><img class='scrollimage' id='img-" + firebasePage + "' data-detail-id='" + firebasePage + "' data-original='" + feature_image + "' alt='" + title + "'/></span></a>" + hilight + "</div></div></li>";
                //winstars = "<li id='listitemid-" + firebasePage + "' data-pageid='" + firebasePage + "'><div data-detail-id='" + firebasePage + "' class='img-box' id='div-img-" + firebasePage + "' ><div class='image promo'><a id='anchor-" + firebasePage + "' class='detailimage' href='javascript:void(0);' data-modal-id='slide-99' data-detail-id='" + firebasePage + "'>";
                //winstars += "<img class='scrollimage' id='img-" + firebasePage + "' data-detail-id='" + firebasePage + "' data-lazy='" + feature_image + "' alt='" + title + "'/></a>" + hilight + "</div></div></li>";
            } else {
                winstars = "<li id='listitemid-" + firebasePage + "' data-pageid='" + firebasePage + "'><div data-detail-id='" + firebasePage + "' class='img-box' id='div-img-" + firebasePage + "' ><div class='image promo'><a id='anchor-" + firebasePage + "' class='detailimage' href='javascript:void(0);' data-modal-id='slide-99' data-detail-id='" + firebasePage + "'>";
                //winstars += "<span class='bar-unfill'><img class='scrollimage' id='img-" + firebasePage + "' data-detail-id='" + firebasePage + "' data-original='" + feature_image + "' alt='" + title + "'/></span>";
                winstars += "<span class='noimage'>&nbsp;</span></a>" + hilight + "</div></div></li>";
            }
         } else winstars = "<li id='listitemid-" + firebasePage + "' data-pageid='" + firebasePage + "'><span data-contentid='" + firebasePage + "'>" + content.trim() + "</span></li>";
     }
     if (nextPageIndex == 0) targetList.html(winstars);
     else targetList.append(winstars);
     //$my.responsive.slick("lazyLoad");

     //var anchortext = 'a#anchor-'+firebasePage;
     //loadModal(anchortext, slidecount);
     //$my['slides_' + slidecount].scrollz({});
     if (nextPageIndex === 0) {
         //$my['slides_' + slidecount].scrollz('hidePullHeader');
     }
     //nextPageIndex++;
     //loading = false;
     if (endReached) {
         //nextPageIndex = -1;
     }
 }
