// Load detail function

function loadDetail(slidecount) {
    if (!loading) {

        $my.backIndex = $my.lastIndex;
        loading = true;

        var targetList = $my.items_99;

        $my['dataLoaded_' + slidecount] = true;
        $my['dataDateTime_' + slidecount] = Date.now();

        targetList.empty();

        if ($my.detailId.indexOf("official-bi") > 0) var refdetail = categoriesRef.child("-1").child("pages").child($my.detailId);
        else var refdetail = categoriesRef.child($my.lastIndex).child("pages").child($my.detailId);

        var winstars = "";
        if ($my.debug) console.log("https://sweltering-inferno-2198.firebaseio.com/sections/categories/" + $my.lastIndex + "/pages/" + $my.detailId);
        refdetail.on('value', function(pages) {
            var grouppage = pages.val();
            var i = 0;
            var el = pages.val();

            var firebasePage = i;
            var date = el.to_date;
            var dateArray = date.split(" ");
            date = dateArray[0];
            var title = el.title;
            var img = el.feature_image;
            var thumb_image = el.thumb_image;
            var feature_image = el.feature_image;
            var wide_image = el.wide_image;
            var content = el.content;
            var html_content = typeof el.html_content === 'undefined' ? " <p>Please check back later</p> " : JSON.stringify(el.html_content);
            var url = el.url;
            var category = el.category;
            var id = el.pageid;
            var section_title = el.section_title;
            var category_title = el.category_title;
            var ticket_contact = typeof el.ticket_contact === 'undefined' ? "" : el.ticket_contact;
            var ticket_link = typeof el.ticket_link === 'undefined' ? "" : el.ticket_link;
            var ticket_price = typeof el.ticket_price === 'undefined' ? "" : el.ticket_price;
            var door_time = typeof el.door_time === 'undefined' ? "" : el.door_time;
            var event_time = typeof el.event_time === 'undefined' ? "" : el.event_time;
            var how_often_recurring = typeof el.how_often_recurring === 'undefined' ? "" : el.how_often_recurring;
            var from_date = typeof el.from_date === 'undefined' ? "" : el.from_date;

            var itemdate = "";
            var itemcontent = [];
            var itemcontent_string = "";
            var itemcontent_text = "";
            var itemcontent_img = "";
            var itemcontent_ticket_link = "";
            var itemcontent_ticket_price = "";
            var itemcontent_ticket_contact = "";
            var itemcontent_door_time = "";
            var itemcontent_event_time = "";
            var itemcontent_how_often_recurring = "";

            var itempubDate = "";
            var wordcount = 15;
            if (typeof date === 'undefined' || date == null) {
                date = "";
            } else {
                if (date.length > 0 && date !== '2099-01-01') {
                    var myDate = new Date(date);
                    if ($my.debug) console.info(date);
                    var n = myDate.getTimezoneOffset();
                    var nd = myDate.setHours(myDate.getHours() + (n / 60));
                    if (how_often_recurring.length === 0) {
                        itemdate = "<em class='date'>" + myDate.format('D, M jS, Y') + " " + event_time + "</em>";
                        itempubDate = myDate.format('Y-m-d h:i:s');
                    } else {
                        how_often_recurring = how_often_recurring.trim().length > 0 ? how_often_recurring + '<br />' : '';

                        var dateArray = from_date.split(" ");
                        from_date = dateArray[0];
                        var myfromDate = new Date(from_date);
                        var n = myfromDate.getTimezoneOffset();
                        var nd = myfromDate.setHours(myfromDate.getHours() + (n / 60));
                        itemdate = "<em class='date'>" + how_often_recurring + "From: " + myfromDate.format('D, M jS, Y') + "<br />To: " + myDate.format('D, M jS, Y') + "</em>";
                    }
                }
            }
            $my.title_99.html(title);
            $my.date_99.html(itemdate);
            var embedid = '';
            itemcontent_img = "<div class='img-box image' id='" + firebasePage + "-img'><span class='bar-unfill'><img class='scrollimage' src='" + img + "' alt='" + title + "' /></span></div>";
            //if (content.trim().length > 0) itemcontent_string = content;
            if (html_content.trim().length > 0) itemcontent_string = html_content;
            //else html_content = "<p>Please check back later</p>";
            if (itemcontent_string.indexOf("<iframe") > 0 && itemcontent_string.indexOf("youtube") > 0) {
                var embedid_location_start = itemcontent_string.indexOf("embed/") + 6;
                embedid = itemcontent_string.substring(embedid_location_start, itemcontent_string.indexOf("?", embedid_location_start));
                $my.embedid = embedid;
                itemcontent_string = itemcontent_string.replace('<iframe', '<!-- ');
                itemcontent_string = itemcontent_string.replace('iframe></p>"', ' -->');
                //itemcontent_string += "<div id='laiframe'></div>";
                //
                itemcontent_string += "<div id='laiframe'><iframe width='100%' height='100%' src='https://www.youtube.com/embed/" + $my.embedid + "?html5=True' frameborder='0' allowfullscreen></iframe></div>";
                $my.embedid = "";
            } //else itemcontent_string = itemcontent_string.replace(/src=/gi, 'class="scrollimage" data-original=');
            //itemcontent_string = itemcontent_string.replace(/src=/gi, 'data-lazy=');
            //itemcontent_string = itemcontent_string.replace(/src=/gi, 'class="lazy" src=');
            itemcontent_string = itemcontent_string.replace('<p>\n', '<p>');

            itemcontent_string = itemcontent_string.replace(/\\t/g, '&nbsp;&nbsp;&nbsp;');
            itemcontent_string = itemcontent_string.replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
            itemcontent_string = itemcontent_string.replace(/(?:\r\n|\r|\n)/g, '<div id="br">&nbsp;</div>');
            itemcontent_string = itemcontent_string.replace(/\\n/g, '');
            itemcontent_string = itemcontent_string.replace(/\\r/g, '');
            itemcontent_string = itemcontent_string.replace(/\\\"/g, '"');
            itemcontent_string = itemcontent_string.replace(/\\/g, '');
            itemcontent_string = itemcontent_string.replace(/\\"/g, '"');
            itemcontent_string = itemcontent_string.replace(/\\n/g, '');

            itemcontent_string = itemcontent_string.replace(/\\ "/g, '');
            itemcontent_string = itemcontent_string.replace(/\"/g, '"');
            itemcontent_string = itemcontent_string.replace(/"blank"/g, '"_blank"');
			if ($my.detailId.indexOf("official-bi") == 0) itemcontent_string = itemcontent_string.replace(/href=/g, 'target="_blank" href=');
            itemcontent_string = itemcontent_string.replace(/color=\"white\"/g, 'color="#52060"');
			//itemcontent_string = itemcontent_string.replace(/href="http:\/\/winstarworldcasino.com\/winstar-rv-park-policies\/"/g, 'href="http://winstarworldcasino.com/winstar-rv-park-policies/" target="_blank"');
			//itemcontent_string = itemcontent_string.replace(/href="http:\/\/winstarworldcasino.com\/accommodations-hotel-guest-rooms"/g, 'href="http://winstarworldcasino.com/accommodations-hotel-guest-rooms" target="_blank"');
			//itemcontent_string = itemcontent_string.replace(/href="http:\/\/www.winstarworldcasino.com\/the-pool-at-pool-tower-south-now-open\/"/g, 'href="http://www.winstarworldcasino.com/the-pool-at-pool-tower-south-now-open/" target="_blank"');

			itemcontent_string = itemcontent_string.replace('href="#cabana-gallery"', 'href="javascript:void(0);" target="_blank" onclick="openurl(\'http://www.winstarworldcasino.com/the-pool-at-pool-tower-south-now-open/\');"');
			itemcontent_string = itemcontent_string.replace('href="#hotel-gallery"', 'href="javascript:void(0);" target="_blank" onclick="openurl(\'http://www.winstarworldcasino.com/winstar-world-casino-hotel/\');"');

            itemcontent_string = itemcontent_string.replace('<a class="button booknow" title="Winstar World Casino Hotel">Book Now</a>', '');

            itemcontent_text = "<div class='text'>" + itemcontent_string.slice(1, -1).trim() + "</div>";

            if (ticket_link.length > 0) {
                //itemcontent_ticket_link = '<div class="text"><a href="javascript:void(0);" onclick="javascript:openurl(\''+ticket_link+'\');" target="_blank" class="button button-red center-button">FIND TICKETS</a></div>';
                action_footer_ticket_link = '<a href="javascript:void(0);" onclick="javascript:openurl(\'' + ticket_link + '\');" target="_blank" class="button button-red center-button">FIND TICKETS</a>';
                $my.action_footer.html(action_footer_ticket_link);
            } else $my.action_footer.empty();
            if (ticket_price.length > 0) itemcontent_ticket_price = '<div class="text">' + ticket_price + '</div>';
            if (ticket_contact.length > 0) itemcontent_ticket_contact = '<div class="text">' + ticket_contact + '</div>';
            if (door_time.length > 0) itemcontent_door_time = '<div class="text">' + door_time + '</div>';
            if (event_time.length > 0) itemcontent_event_time = '<div class="text">' + event_time + '</div>';
            if (how_often_recurring.length > 0) itemcontent_how_often_recurring = '<div class="text">' + how_often_recurring + '</div>';

			winstars 	+= "<li style='height: 100%;'>"
						+  "<div id='detail-99' class='text-box'>" + itemcontent_img + how_often_recurring + itemcontent_text + itemcontent_door_time + itemcontent_ticket_price + itemcontent_ticket_contact + itemcontent_ticket_link + "</div>"
						+ "</li>";
            i++;
            //targetList.empty();
            targetList.html(nl2br(winstars));

            $('a.detailbio').reBind('click', showDetail);

            nextPageIndex++;
            loading = false;
        });
    }
}