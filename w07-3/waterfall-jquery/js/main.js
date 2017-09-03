$(document).ready(function() {
    $(window).on('load', function(event) {
        waterfall();
        var dataImg = { 'data': [{ 'src': 'p0.jpg' }, { 'src': 'p1.jpg' }, { 'src': 'p2.jpg' }, 
		    { 'src': 'p3.jpg' }, { 'src': 'p4.jpg' }, { 'src': 'p5.jpg' }, { 'src': 'p6.jpg' }, 
		    { 'src': 'p7.jpg' }, { 'src': 'p8.jpg' }, { 'src': 'p9.jpg' }] };
		// 滚动时
        window.onscroll = function() {
            if (scrollside()) {
                $.each(dataImg.data, function(index, el) {
                	// 添加元素
                    var pin = $("<div>").addClass("pin").appendTo($("#waterfall"));
                    var picture = $("<div>").addClass("picture").appendTo(pin);
                    $("<img>").attr("src", "./img/" + $(el).attr("src")).appendTo(picture);
                });
                waterfall();
            }
        };
        // 宽度变化时
        window.onresize = function() {
		    var pin = $('.pin');
		    var pinWidth = pin.eq(0).outerWidth();
		    var num = Math.floor($(window).width() / pinWidth);
		    // 最小列数为4
		    if(num >= 4){
		    	waterfall();
		    }
	    }
    });
});


// 判断是否滚到底部
function scrollside() {
    var pin = $(".pin");
    // 最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var lastPinHeight = pin.last().get(0).offsetTop + Math.floor(pin.last().outerHeight() / 2);
    // 滚动高度
    var scrollHeight = $(document).scrollTop();
    // 页面高度
    var windowHeight = $(window).outerHeight(true);
    // console.log('lastPinHeight:' + lastPinHeight + "  windowHeight:" + windowHeight + "  scrollHeight:" + scrollHeight);
    return (lastPinHeight < scrollHeight + windowHeight) ? true : false;
}
// 瀑布流
function waterfall() {
    var pin = $('.pin');
    var pinWidth = pin.eq(0).outerWidth();
    var num = Math.floor($(window).width() / pinWidth);
    if(num < 4){
    	num = 4;
    }
    // 设置父容器居中
    $('#waterfall').css({
        'width': pinWidth * num,
        'margin': '0 auto'
    });
    var pinArr = [];
    pin.each(function(index, el) {
        var pinHeight = pin.eq(index).outerHeight();
        if (index < num) {
            pinArr[index] = pinHeight;
            $(el).css({
                'position': 'absolute',
                'top': '0px',
                'left': index * pinWidth
            });
        } else {
            var minPinHeight = Math.min.apply(null, pinArr);
            var minPinIndex = $.inArray(minPinHeight, pinArr);
            $(el).css({
                'position': 'absolute',
                'top': minPinHeight,
                'left': pin.eq(minPinIndex).position().left
            });
            pinArr[minPinIndex] += pin.eq(index).outerHeight();
        }
    });
}
