document.oncontextmenu = new Function("event.returnValue=false;");
document.onselectstart = new Function("event.returnValue=false;");
// 事件绑定
// element.onclick = function(e){
// };
document.getElementById(".").onclick = function() {
    typetoinput(".");
}
document.getElementById("1").onclick = function() {
    typetoinput("1");
}
document.getElementById("2").onclick = function() {
    typetoinput("2");
}
document.getElementById("3").onclick = function() {
    typetoinput("3");
}
document.getElementById("4").onclick = function() {
    typetoinput("4");
}
document.getElementById("5").onclick = function() {
    typetoinput("5");
}
document.getElementById("6").onclick = function() {
    typetoinput("6");
}
document.getElementById("7").onclick = function() {
    typetoinput("7");
}
document.getElementById("8").onclick = function() {
    typetoinput("8");
}
document.getElementById("9").onclick = function() {
    typetoinput("9");
}
document.getElementById("0").onclick = function() {
    typetoinput("0");
}

document.getElementById("asin").onclick = function() {
    operator("asin");
}
document.getElementById("acos").onclick = function() {
    operator("acos");
}
document.getElementById("atan").onclick = function() {
    operator("atan");
}
document.getElementById("sin").onclick = function() {
    operator("sin");
}
document.getElementById("cos").onclick = function() {
    operator("cos");
}
document.getElementById("tan").onclick = function() {
    operator("tan");
}

document.getElementById("ln").onclick = function() {
    operator("ln");
}
document.getElementById("lg").onclick = function() {
    operator("lg");
}

document.getElementById("pow2").onclick = function() {
    operator("pow2");
}
document.getElementById("sqrt").onclick = function() {
    operator("sqrt");
}
document.getElementById("percent").onclick = function() {
    operator("percent");
}
document.getElementById("opposite").onclick = function() {
    operator("opposite");
}
document.getElementById("result").onclick = function() {
    operator("result");
}

document.getElementById("plus").onclick = function() {
    operator("plus");
}
document.getElementById("minus").onclick = function() {
    operator("minus");
}
document.getElementById("multiply").onclick = function() {
    operator("multiply");
}
document.getElementById("divide").onclick = function() {
    operator("divide");
}

document.getElementById("backspace").onclick = function() {
    operator("backspace");
}
document.getElementById("clear").onclick = function() {
    operator("clear");
}


// 存储 第一个数字 第二个数字
var _string = [];
// 二元运算符 + - * /
var _type = "";
// 是否有结果标记
var hasResult = false;
// 显示器
var inputView = document.getElementById("formula");
// 一些常量
var _errorConstant = "出错";
var _errorDivideZero = "出错:除数不能为0";
var _errorZeroDivide = "出错:被除数不能为0";
var _infinityConstant = "Infinity";
var _nanConstant = "NaN";

// 判断是否有错误结果
function hsaError(value) {
    if (value == _infinityConstant || 
        value == _nanConstant || 
        value == _errorConstant ||
        value == _errorZeroDivide ||
        value == _errorDivideZero) {
        return true;
    } else {
        return false;
    }
}

// 数字输入事件
function typetoinput(num) {
    //console.log(num);
    // console.log(hasResult);
    // 当有错误结果 清0
    if (hsaError(inputView.value)) {
        inputView.value = num;
        _string = [];
        _type = "";
    }
    // 当输入有符号
    if (checkSign(inputView.value)) {
        inputView.value = "";
    }
    if (hasResult && _type != "") {
        inputView.value = "";
        hasResult = false;
    }
    if (hasResult && _type == "") {
        inputView.value = "0";
        inputView.value += num;
        hasResult = false;
        _string = [];
    }
    if (num == "." && inputView.value == "") {
        inputView.value = "0.";
    }
    // 当输入不是小数点且还未输入小数点
    if (num != "." && inputView.value[0] == 0 && inputView.value[1] != ".") {
        inputView.value = num;
    }
    // 输入小数点且还未输入小数点
    else if (num == "." && inputView.value.indexOf(".") > -1) {
        inputView.value = inputView.value;
    } else {
        inputView.value += num;
    }
}

// 运算事件
function operator(type) {
    // console.log(type);
    // 当有错误结果 清0
    if (hsaError(inputView.value)) {
        inputView.value = "0";
        _string = [];
        _type = "";
    }
    console.log(inputView.value);
    console.log(type);
    switch (type) {
        // 清0
        case "clear":
            inputView.value = "0";
            _string = [];
            _type = "";
            hasResult = false;
            break;
            // 回删
        case "backspace":
            if (!checkSign(inputView.value)) {
                if (!hasResult) {
                    inputView.value = inputView.value.replace(/.$/, '');
                    if(inputView.value == "-") {
                        inputView.value = "";
                    }
                    if (inputView.value == "") {
                        inputView.value = "0";
                    }
                }
            }
            break;
            // 正负数
        case "opposite":
            if (!checkSign(inputView.value)) {
                inputView.value = -parseFloat(inputView.value);
                if (_string.length == 1 && hasResult) {
                    _string[0] = inputView.value;
                }
            }
            break;
            // 百分数
        case "percent":
            if (!checkSign(inputView.value)) {
                // num1 * 10000000 * num2 / 10000000
                inputView.value = parseFloat(inputView.value) * 1000000 * 0.01 / 1000000;
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                _type = "";
            }
            break;
            // 平方
        case "pow2":
            if (!checkSign(inputView.value)) {
                inputView.value = Math.pow(parseFloat(inputView.value), 2);
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                _type = "";
            }
            break;
            // 平方根
        case "sqrt":
            if (!checkSign(inputView.value)) {
                if (parseFloat(inputView.value) > 0) {
                    inputView.value = Math.sqrt(parseFloat(inputView.value));
                } else {
                    // 负数不能开平方根
                    inputView.value = _errorConstant;
                }
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                _type = "";
            }
            break;
            // sin函数
        case "sin":
            if (!checkSign(inputView.value)) {
                // sin30 = 0.5 精度问题
                if(inputView.value == "30"){
                    inputView.value = "0.5";
                } else {
                    inputView.value = Math.sin(parseFloat(inputView.value)*Math.PI/180);
                }
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                _type = "";
            }
            break;
            // cos函数
        case "cos":
            if (!checkSign(inputView.value)) {
                // cos60 = 0.5 精度问题
                if(inputView.value == "60"){
                    inputView.value = "0.5";
                } else {
                    inputView.value = Math.cos(parseFloat(inputView.value)*Math.PI/180);
                }
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                _type = "";
            }
            break;
            // tan函数
        case "tan":
            if (!checkSign(inputView.value)) {
                // tan45 = 1 精度问题
                if(inputView.value == "45"){
                    inputView.value = "1";
                } else {
                    inputView.value = Math.tan(parseFloat(inputView.value)*Math.PI/180);
                }
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                _type = "";
            }
            break;
            // asin函数
        case "asin":
            if (!checkSign(inputView.value)) {
                if (parseFloat(inputView.value) > 1 || parseFloat(inputView.value) < -1) {
                    inputView.value = _errorConstant;
                } else {
                    inputView.value = Math.asin(parseFloat(inputView.value));
                    _string = [];
                    _string.push(inputView.value);
                }
                _type = "";
                hasResult = true;
            }
            break;
            // acos函数
        case "acos":
            if (!checkSign(inputView.value)) {
                if (parseFloat(inputView.value) > 1 || parseFloat(inputView.value) < -1) {
                    inputView.value = _errorConstant;
                } else {
                    inputView.value = Math.acos(parseFloat(inputView.value));
                    _string = [];
                    _string.push(inputView.value);
                }
                _type = "";
                hasResult = true;
            }
            break;
            // atan函数
        case "atan":
            if (!checkSign(inputView.value)) {
                inputView.value = Math.atan(parseFloat(inputView.value));
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                _type = "";
            }
            break;
            // lg函数
        case "lg":
            if (!checkSign(inputView.value)) {
                if (parseFloat(inputView.value) > 0) {
                    inputView.value = Math.log10(parseFloat(inputView.value));
                    _string = [];
                    _string.push(inputView.value);
                } else {
                    // <=0 不能求lg
                    inputView.value = _errorConstant;
                }
                _type = "";
                hasResult = true;
            }
            break;
            // ln函数
        case "ln":
            if (!checkSign(inputView.value)) {
                if (parseFloat(inputView.value) > 0) {
                    inputView.value = Math.log(parseFloat(inputView.value));
                    _string = [];
                    _string.push(inputView.value);
                } else {
                    // <=0 不能求ln
                    inputView.value = _errorConstant;
                }
                _type = "";
                hasResult = true;
            }
            break;
            // 加
        case "plus":
            if (!checkSign(inputView.value)) {
                _string.push(inputView.value);
            }
            inputView.value = "+";
            // 运算
            if (_string.length == 2 && _type != "") {
                inputView.value = calcu(_string, _type);
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
            }
            _type = "plus";
            break;
            // 减
        case "minus":
            if (!checkSign(inputView.value)) {
                _string.push(inputView.value);
            }
            inputView.value = "-";
            // 运算
            if (_string.length == 2 && _type != "") {
                inputView.value = calcu(_string, _type);
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
            }
            _type = "minus";
            break;
            // 乘
        case "multiply":
            if (!checkSign(inputView.value)) {
                _string.push(inputView.value);
            }
            inputView.value = "×";
            // 运算
            if (_string.length == 2 && _type != "") {
                inputView.value = calcu(_string, _type);
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
            }
            _type = "multiply";
            break;
            // 除
        case "divide":
            if (!checkSign(inputView.value)) {
                _string.push(inputView.value);
            }
            inputView.value = "÷";
            // 运算
            if (_string.length == 2 && _type != "") {
                inputView.value = calcu(_string, _type);
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
            }
            _type = "divide";
            break;
            // 等于
        case "result":
            // 没有数值时
            if (_string.length == 0) {
                hasResult = true;
            }
            // 有一个数字时 有运算符时
            if (_string.length == 1 && _type != "" && hasResult == false && !checkSign(inputView.value)) {
                _string.push(inputView.value);
            }
            console.log("re "+_string);
            // 有2个数字时 还未计算
            if (_string.length == 2 && _type != "") {
                inputView.value = calcu(_string, _type);
                hasResult = true;
                _string = [];
                _string.push(inputView.value);
                hasResult = true;
                _type = ""
            }
            break;
    }
    console.log("=========== "+_string);
}
// 加减乘除
function calcu(values, type) {
    console.log(values + "--" + type);
    if (type == "") {
        return;
    }
    switch (type) {
        case "plus":
            return numAdd(values[0], values[1]);
        case "minus":
            return numMinus(values[0], values[1]);
        case "multiply":
            return numMultiplication(values[0], values[1]);
        case "divide":
            return numDivision(values[0], values[1]);
        default:
            return;
    }
}
// 加法
function numAdd( /*Number*/ num1, /*Number*/ num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};

// 减法
function numMinus( /*Number*/ num1, /*Number*/ num2) {
    return num1 - num2;
}

// 乘法
function numMultiplication( /*Number*/ num1, /*Number*/ num2) {
    return num1 * 10000000 * num2 / 10000000;
}

// 除法
function numDivision( /*Number*/ num1, /*Number*/ num2) {
    // 被除数为0
    if (num1 == 0) {
        return _errorZeroDivide;
    }
    // 除数为0
    if (num2 == 0) {
        return _errorDivideZero;
    }
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try { t1 = num1.split(".")[1].length } catch (e) {}
    try { t2 = num2.split(".")[1].length } catch (e) {}
    with(Math) {
        r1 = Number(num1.replace(".", ""))
        r2 = Number(num2.replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
    // return num1 / num2
}

function checkSign(value) {
    if (value == "+" || value == "-" || value == "×" || value == "÷") {
        return true;
    }
    return false;
}
