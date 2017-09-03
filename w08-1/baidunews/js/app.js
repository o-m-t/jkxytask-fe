// app.js
$(document).ready(function() {
    refreshNews('推荐');

    $('#nav_list a').click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("selected").siblings().removeClass();
        var type = $(this).text();
        refreshNews(type);
    });
});

function refreshNews(newstype) {
    var $lists = $('.news_lists');
    $lists.empty();
    $.ajax({
            url: 'server/getnews.php',
            type: 'get',
            dataType: 'json',
            data: {'newstype': newstype},
        })
        .done(function(data) {
            console.log(data);
            data.forEach( function(element, index) {
                var $list = $('<li></li>').addClass('news_list').appendTo($lists);
                var $newsimg = $('<div></div>').addClass('newsimg').appendTo($list);
                var $newsimg_img = $('<img>').attr('src', element.newsimg).appendTo($newsimg);
                var $newscontent = $('<div></div>').addClass('newscontent').appendTo($list);
                var $newscontent_h1 = $('<h1></h1>').html(element.newstitle).appendTo($newscontent);
                var $newscontent_p = $('<p></p>').appendTo($newscontent);
                var $newstime = $('<span></span>').addClass('newstime').html(element.newstime).appendTo($newscontent_p);
                var $newssrc = $('<span></span>').addClass('newssrc').html(element.newssrc).appendTo($newscontent_p);
                
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
