// app.js
// 构造模式：将页面相关方法封装成一个对象，方便维护和扩展。
var index = {
    // 初始化页面
    initView: function () {
        var __this = this;
        __this.loadBackgroundImage();
        __this.userHyperlink();
        __this.settingHyperlink();
        __this.moreHyperlink();
        __this.loadTab();
        __this.searchBoxFixed();
        __this.changeSkin();
    },
    // 加载背景图片
    loadBackgroundImage: function () {
        var skinId = $.cookie("MySkin");
        var __this = this;
        __this.switchSkin(skinId);
    },
    // 用户超链接事件
    userHyperlink: function () {
        // 用户 链接 移入/移出
        var isUserShow = false;
        $('#s_username_top').hover(function () {
            $('#s_user_name_menu').show();
            isUserShow = true;
        }, function () {
            isUserShow = false;
            window.setTimeout(function () {
                if (!isUserShow) {
                    $('#s_user_name_menu').hide();
                }
            }, 100);
        });
        // 用户 下拉框 移入/移出
        $('#s_user_name_menu').hover(function () {
            isUserShow = true;
        }, function () {
            $('#s_user_name_menu').hide();
            isUserShow = false;
        });
    },
    // 设置超链接事件
    settingHyperlink: function () {
        // 设置 链接 移入/移出
        var isSettingShow = false;
        $('a.s-user-setting-top').hover(function () {
            $('#s_user_setting_menu').show();
            isSettingShow = true;
        }, function () {
            isSettingShow = false;
            window.setTimeout(function () {
                if (!isSettingShow) {
                    $('#s_user_setting_menu').hide();
                }
            }, 100);
        });
        // 设置 下拉框 移入/移出
        $('#s_user_setting_menu').hover(function () {
            isSettingShow = true;
        }, function () {
            $('#s_user_setting_menu').hide();
            isSettingShow = false;
        });
    },
    // 更多产品超链接事件
    moreHyperlink: function () {
        // 更多产品 链接
        var scrollTop = -1; // 鼠标进入更多产品 链接，则存储当前window滚动条的高度
        var isMoreShow = false;
        $('a.s_bri').hover(function () {
            $('.s_bdbri').slideDown();
            isMoreShow = true;
            scrollTop = $(window).scrollTop();
            console.log(scrollTop);
        }, function () {
            isMoreShow = false;
            window.setTimeout(function () {
                if (!isMoreShow) {
                    $('.s_bdbri').slideUp();
                }
            }, 100);
        });
        // 更多产品 侧边栏 移入/移出
        $('.s_bdbri').hover(function () {
            isMoreShow = true;
        }, function () {
            $('.s_bdbri').slideUp();
            isMoreShow = false;
        });
        // 鼠标进入到区域后，则滚动失效
        $(window).bind("wheel", function (event) {
            if (isMoreShow) {
                event.preventDefault();
                return false;
            }
            return true;
        });
    },
    // Tab相关事件
    loadTab: function () {
        // tab页
        $('#tab-title li').click(function () {
            $(this).addClass("selected").siblings().removeClass(); //removeClass就是删除当前其他类；
            //只有当前对象有addClass("selected")；siblings()意思就是当前对象的同级元素，removeClass就是删除； 
            $("#tab-content > ul").hide().eq($('#tab-title li').index(this)).show();
        });
    },
    // 搜索框动态居中事件
    searchBoxFixed: function () {
        var searchH = 147;
        var halfWidth = $(window).width() / 2;
        halfWidth = halfWidth > 500 ? halfWidth : 500;
        // 搜索框固定
        // 滚动条事件
        $(window).scroll(function () {
            //获取滚动条的滑动距离
            var scroH = $(this).scrollTop();
            // console.log("scroH: "+scroH );
            // console.log('halfWidth ' + halfWidth)
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if (scroH >= searchH) {
                $("#head_wrapper").css('left', halfWidth + 'px');
                $("#head_wrapper").addClass('s-down');
                $("#top_wrap").addClass('s-down');
                $('#s_wrap').css('padding-top', '293px');
            } else if (scroH < searchH) {
                $("#head_wrapper").css('left', '0');
                $("#head_wrapper").removeClass('s-down');
                $("#top_wrap").removeClass('s-down');
                $('#s_wrap').css('padding-top', '0');
            }
            console.log(scroH == searchH);
        })
        // 窗口大小改变时，控制搜索框居中
        $(window).resize(function () {
            halfWidth = $(window).width() / 2;
            halfWidth = halfWidth > 500 ? halfWidth : 500;
            var scroH = $(this).scrollTop();
            // console.log('halfWidth ' + halfWidth);
            if (scroH >= searchH) {
                $("#head_wrapper").css('left', halfWidth + 'px');
            } else if (scroH < searchH) {
                $("#head_wrapper").css('left', '0');
            }
        });
    },
    // 换肤相关事件
    changeSkin: function () {
        var __this = this;
        // 换肤界面 显示
        $("#s_icons").click(function (event) {
            $("#skin_layer").css('top', '0');
        });
        // 换肤界面 隐藏
        $("#skin_close").click(function (event) {
            $("#skin_layer").removeAttr("style");
        });
        // 换肤
        $('.skin_img_list .skin_img_item').on('click', function (event) {
            var skinId = this.id;
            __this.switchSkin(skinId);
            $.cookie("MySkin", skinId, {
                expires: 10
            });
        });
        // 不使用皮肤
        $("#skin_unuse").click(function (event) {
            __this.switchSkin('');
            $.cookie("MySkin", '', {
                expires: 10
            });
        });
    },

    // 换肤方法
    switchSkin: function (skinId) {
        //var bgWhite = __uri('/img/logo_white.png');
        //var bgNormal = __uri('/img/bd_logo1.png');
        var bgWhite = './img/logo_white.png';
        var bgNormal = './img/bd_logo1.png';
        if (skinId && skinId != '') {
            $('#top_wrap').css('background', 'rgba(200,200,200,0.8)');
            $('#s_lg_img').attr({
                src: bgWhite
            });
        } else {
            $('#top_wrap').removeAttr('style');
            $('#s_lg_img').attr({
                src: bgNormal
            });
        }
        switch (skinId) {
            case 'style01':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_01.jpg)');
                break;
            case 'style02':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_02.jpg)');
                break;
            case 'style03':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_03.jpg)');
                break;
            case 'style04':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_04.jpg)');
                break;
            case 'style05':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_05.jpg)');
                break;
            case 'style06':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_06.jpg)');
                break;
            case 'style07':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_07.jpg)');
                break;
            case 'style08':
                $('#skin_container').css('background-image', 'url(./img/bg/bg_08.jpg)');
                break;
            default:
                $('#skin_container').removeAttr('style');
                break;
        }
    }
}

$(document).ready(function () {
    // 命令模式：将页面初始化等工作统一交由initView方法完成，代码逻辑更清晰。
    index.initView();
});