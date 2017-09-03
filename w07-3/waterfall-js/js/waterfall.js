var pinName = 'pin';
window.onload = function() {
    waterfall(pinName);
    // json
    var dataInt = { 'data': [{ 'src': 'p0.jpg' }, { 'src': 'p1.jpg' }, { 'src': 'p2.jpg' }, 
	    { 'src': 'p3.jpg' }, { 'src': 'p4.jpg' }, { 'src': 'p5.jpg' }, { 'src': 'p6.jpg' }, 
	    { 'src': 'p7.jpg' }, { 'src': 'p8.jpg' }, { 'src': 'p9.jpg' }] };

    window.onscroll = function() {
        if (checkscrollside()) {
            // 父级对象
            var oParent = getMainContainer();;
            for (var i = 0; i < dataInt.data.length; i++) {
                // 添加 pin元素节点
                var oPin = document.createElement('div');
                oPin.className = 'pin';                
                oParent.appendChild(oPin);
                // 添加 picture元素节点
                var oPicture = document.createElement('div');
                oPicture.className = 'picture';
                oPin.appendChild(oPicture);
                var oImg = document.createElement('img');
                // 添加 img标签节点
                oImg.src = './img/' + dataInt.data[i].src;
                oPicture.appendChild(oImg);
            }
            waterfall(pinName);
        };
    }

    window.onresize = function() {
	    var num = getRowPinNum(pinName);
	    if(num >= 4){
	    	waterfall(pinName);
	    }
    }
}


function getRowPinNum(pin){
	var oParent = getMainContainer();
    var aPin = getClassObj(oParent, pin);
    var iPinW = aPin[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / iPinW);
    return num;
}

function getMainContainer(){
	return document.getElementById('waterfall');
}
/*
 * parend 父级id
 * pin 元素class
 */
function waterfall(pin) {
    // 父级对象
    var oParent = getMainContainer();
    // 获取存储块框pin的数组aPin
    var aPin = getClassObj(oParent, pin);
    // 一个块框pin的宽 [offsetWidth 是对象的可见宽度，包滚动条等边线，会随窗口的显示大小改变]
    var iPinW = aPin[0].offsetWidth;
    // 每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    var num = Math.floor(document.documentElement.clientWidth / iPinW);
    if(num < 4){
    	num = 4;
    }
    // 设置父级居中样式：定宽+自动水平外边距
    oParent.style.cssText = 'width:' + iPinW * num + 'px;margin:0 auto;';
    // oParent.style.cssText = 'margin:0 auto;';
    // 用于存储每列中的所有块框相加的高度。
    var pinHArr = [];
    // 遍历数组aPin的每个块框元素
    for (var i = 0; i < aPin.length; i++) {
        var pinH = aPin[i].offsetHeight;
        if (i < num) {
            // 第一行中的num个块框pin 先添加进数组pinHArr
            pinHArr[i] = pinH;
            aPin[i].style.position = 'absolute';
            aPin[i].style.top = '0px';
            aPin[i].style.left = i * iPinW + 'px';
        } else {
            // 数组pinHArr中的最小值minH
            var minH = Math.min.apply(null, pinHArr);
            var minHIndex = getminHIndex(pinHArr, minH);
            // 设置绝对位移
            aPin[i].style.position = 'absolute';
            aPin[i].style.top = minH + 'px';
            aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
            // 数组 最小高元素的高 + 添加上的aPin[i]块框高
            // 更新添加了块框后的列高
            pinHArr[minHIndex] += aPin[i].offsetHeight;
        }
    }
    // console.log(pinHArr.length);
}

/*
 * 通过父级和子元素的class类 获取该同类子元素的数组
 */
function getClassObj(parentObj, className) {
    // 获取 父级的所有子集
    var obj = parentObj.getElementsByTagName('*');
    // 创建一个数组 用于收集子元素
    var pins = [];
    // 遍历子元素、判断类别、压入数组
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].className == className) {
            pins.push(obj[i]);
        }
    };
    return pins;
}

/*
 * 获取pin高度 最小值的索引index
 */
function getminHIndex(arr, minH) {
    for (var i in arr) {
        if (arr[i] == minH) {
            return i;
        }
    }
}
/*
 * 检测滚动
 */
function checkscrollside() {
    var oParent = getMainContainer();
    var aPin = getClassObj(oParent, pinName);
    //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var lastPinH = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2);
    //注意解决兼容性
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //页面高度
    var documentH = document.documentElement.clientHeight;
    //到达指定高度后 返回true，触发waterfall()函数
    return (lastPinH < scrollTop + documentH) ? true : false;
}
