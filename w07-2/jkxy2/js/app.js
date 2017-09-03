// app.js
$(document).ready(function() {
	init();

	/**
	 * 初始化事件
	 */
	function init() {
		$(".lesson_list li").hover(lessonHover, lessonOut);
		if ($(window).scrollTop() >= 100) {
	        $("#gotop>.top").fadeIn(300);
	    } else {
	        $("#gotop>.top").stop(true, true).fadeOut(300);
	    }
	}

    /**
     * 滚动事件监听
     */
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
            $("#gotop>.top").fadeIn(300);
        } else {
            $("#gotop>.top").stop(true, true).fadeOut(300);
        }
    })

	/**
	 * 顶部搜索框点开事件
	 */
	$("#search_btn").click(function(event) {
		$(".searchBox").addClass('scale');
	});
	/**
	 * 顶部搜索框关闭事件
	 */
	$("#close-btn").click(function(event) {
		$(".searchBox").removeClass('scale');
	});

	/**
	 * 列表 列表风格
	 */
	$(".list_icon").click(function(event) {
        var e = $(".lesson_list p");
        e.show();
        $(".learn_num").show();
        $(".dengji").show();
        e.height(36);
        $("#changeid").removeClass("lesson_list").addClass("lesson_list2");
        $(".kuai_icon").removeClass("curr");
        $(this).addClass("curr");
	});
	/**
	 * 列表 块状风格
	 */
	$(".kuai_icon").click(function(event) {
		$(".dengji").hide();
        $(".learn_num").hide();
        $("#changeid").removeClass("lesson_list2").addClass("lesson_list");
        $(".list_icon").removeClass("curr");
        $(this).addClass("curr");
        var e = $(".lesson_list p");
        e.height(0);
        e.hide();
        $(".lesson_list li").hover(lessonHover, lessonOut);
	});

	/**
	 * 课程列表块状浮动效果：移入效果
	 */
	function lessonHover() {
		$(this).find(".lessonplay").stop().animate({
		    opacity: 1
		}, 300 );
		if ($(".lesson_list")[0]) {
			$(this).find(".learn_num").show();
	        $(this).find(".dengji").show();
	        var $lessonInfo = $(this).children(".lesson_info");
	        $lessonInfo.stop().animate({
	        	height: "175px"
	        }, 300);
	        $lessonInfo.find("p").show().stop().animate({
	            height: "52px",
	            opacity: 1,
	            display: "block",
	        }, 70);
			$(this).find(".lessonicon_box").css("bottom", "-2px");
		}
	}
	/**
	 * 课程列表块状浮动效果：移出效果
	 */
	function lessonOut() {
		$(this).find(".lessonplay").stop().animate({
		    opacity: 0
		}, 300 );
		if ($(".lesson_list")[0]) {
			$(this).find(".dengji").hide();
	        $(this).find(".learn_num").hide();
	        var $lessonInfo = $(this).children(".lesson_info");
	        $lessonInfo.stop().animate({
	        	height: "88px"
	        }, 300);
	        $lessonInfo.find("p").hide().stop().animate({
	            height: "0px",
	            opacity: 0,
	            display: "none",
	        }, 70);
			$(this).find(".lessonicon_box").css("bottom", "4px");
		}
	}

	/**
	 * 回到顶部事件
	 */
	$("#gotop>.top").click(function() {
	    $("html,body").animate({
	        scrollTop: 0
	    }, 800);
	});
});