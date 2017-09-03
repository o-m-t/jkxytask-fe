// banner 轮播
var banner = {
    config: {
        index: 0,
        auto: true,
        direct: 'left',
        bannerWidth: 750
    },
    init: function() {
        this.container = this.$id('banner_container');
        this.swiper_div = this.$class('banner_swiper')[0];
        this.pagination = this.$tag('a', this.$class('banner_pagination')[0]);
        this.slide = this.$tag('img', this.swiper_div);
        if (this.config.auto) {
            this.play();
        }
        this.hover();
    },
    $id: function(id) {
        return document.getElementById(id);
    },
    $tag: function(tagName, obj) {
        return (obj ? obj : document).getElementsByTagName(tagName);
    },
    $class: function(claN, obj) {
        var tag = this.$tag('*'),
            reg = new RegExp('(^|\\s)' + claN + '(\\s|$)'),
            arr = [];
        for (var i = 0; i < tag.length; i++) {
            if (reg.test(tag[i].className)) {
                arr.push(tag[i]);
            }
        }
        return arr;
    },
    $add: function(obj, claN) {
        reg = new RegExp('(^|\\s)' + claN + '(\\s|$)');
        if (!reg.test(obj.className)) {
            obj.className += ' ' + claN;
        }
    },
    $remove: function(obj, claN) {
        var cla = obj.className,
            reg = "/\\s*" + claN + "\\b/g";
        obj.className = cla ? cla.replace(eval(reg), '') : ''
    },
    css: function(obj, attr, value) {
        if (arguments[2] != null) {
            // console.log(value);
            obj.style[attr] = value;
        } else {
            return typeof window.getComputedStyle != 'undefined' ? window.getComputedStyle(obj, null)[attr] : obj.currentStyle[attr];
        }
    },
    animate: function(obj, attr, val) {
        var d = 1000; //动画时间一秒完成。
        if (obj[attr + 'timer']) {
            clearInterval(obj[attr + 'timer']);
        }
        var start = parseInt(banner.css(obj, attr)); //动画开始位置
        //space = 动画结束位置-动画开始位置，即动画要运动的距离。
        var space = val - start,
            st = (new Date).getTime(),
            m = space > 0 ? 'ceil' : 'floor';
        obj[attr + 'timer'] = setInterval(function() {
            var t = (new Date).getTime() - st; //表示运行了多少时间，
            if (t < d) { //如果运行时间小于动画时间
                var offset = Math[m](banner.easing['easeOut'](t, start, space, d)) + 'px';
                banner.css(obj, attr, offset);
            } else {
                if(banner.config.index == 0){
                    clearInterval(obj[attr + 'timer']);
                    banner.css(obj, attr, '0px');
                } else {
                    clearInterval(obj[attr + 'timer']);
                    banner.css(obj, attr, val + 'px');
                }
            }
        }, 20);
    },
    play: function() {
        this.container.timer = setInterval(function() {
            banner.config.index++;
            
            banner.animate(banner.swiper_div, banner.config.direct, -banner.config.index * banner.config.bannerWidth);
            for (var j = 0; j < banner.pagination.length; j++) {
                banner.$remove(banner.pagination[j], 'hover');
            }
            if (banner.config.index >= banner.pagination.length) {
                banner.config.index = 0; //如果当前索引大于图片总数，把索引设置0
            }
            banner.$add(banner.pagination[banner.config.index], 'hover');

        }, 3000)


    },
    hover: function() {
        for (var i = 0; i < this.pagination.length; i++) {
            this.pagination[i].index = i; //储存每个导航的索引值
            this.pagination[i].onmouseover = function() {
                if (banner.container.timer) {
                    clearInterval(banner.container.timer);
                }
                banner.config.index = this.index;

                for (var j = 0; j < banner.pagination.length; j++) {
                    banner.$remove(banner.pagination[j], 'hover');
                }
                banner.$add(banner.pagination[banner.config.index], 'hover');
                banner.animate(banner.swiper_div, banner.config.direct, -banner.config.index * banner.config.bannerWidth);
            }
            this.pagination[i].onmouseout = function() {
                banner.play();
            }
        }
    },
    easing: {
        linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        swing: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            return ((t /= d / 2) < 1) ? (c / 2 * t * t * t * t + b) : (-c / 2 * ((t -= 2) * t * t * t - 2) + b);
        }
    }
}

banner.init();
