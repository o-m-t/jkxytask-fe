// 设置cookie
function SetCookie(c_name, value) {
    console.log("设置:" + c_name + "--" + value);
    //有效时间  
    var day = 30;
    //建立Date对象  
    var exp = new Date();
    //setTime()，以毫秒设置Date对象。etTime()可返回距 1970 年 1 月 1 日之间的毫秒数。  
    exp.setTime(exp.getTime() + day * 24 * 60 * 1000);
    //写入cookie，escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串  
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// 获取cookie
function GetCookie(c_name) {
    console.log("读取:" + c_name);
    returnvalue = "";
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length
            returnvalue = unescape(document.cookie.substring(c_start, c_end));
        }
    }
    console.log("读取结果:" + returnvalue);
    return returnvalue;
}

var cookieName = "localnowskin";
// 皮肤名称
var thisskin;
thisskin = GetCookie(cookieName);
console.log("---" + thisskin);
// 皮肤css
var skin = document.getElementById("themecss")
if (thisskin != "") {
    skin.href = "./css/" + thisskin;
} else {
    skin.href = "./css/theme_0.css";
}

function changecss(url) {
    if (url != "") {
        realurl = "./css/" + url;
        skin.href = realurl;
        var expdate = new Date();
        expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 30));
        //expdate=null;
        //以下设置COOKIES时间为1年,自己随便设置该时间..
        SetCookie(cookieName, url, expdate, "/", null, false);
    }
}
