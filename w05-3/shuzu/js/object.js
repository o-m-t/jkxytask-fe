var arr = [];

// 查找出现最多的元素
function findMostElement(arr){
	// var arr = ["a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a"];
	var elementsCount = {};
	var elementsPosition = {};
	var mostElementsCount = {};

	for (var i = 0; i < arr.length; i++) {
	 	if(elementsCount[arr[i]]){
	 		elementsCount[arr[i]]++;
	 		elementsPosition[arr[i]] += "," + (i+1);
	 	} else {
	 		elementsCount[arr[i]] = 1;
	 		elementsPosition[arr[i]] = "" + (i+1);
	 	}
	}
	console.log(elementsCount);
	console.log(elementsPosition);

	mostElement[0] = elements[0];
	mostElementCount[0] = elementsCount[0];
	for(var i = 1; i < elements.length; i++) {
		if (elementsCount[i] > mostElementCount[0]) {
			mostElement = [];
			mostElementCount = [];
			mostElement[0] = elements[i];
			mostElementCount[0] = elementsCount[i];
		} else if (elementsCount[i] == mostElementCount[0]) {
			mostElement.push(elements[i]);
			mostElementCount.push(elementsCount[i]);
		}
	}
	console.log(mostElement);
	return mostElement;
}
// 查找元素的位置
function findElementRemark(arr, element){
	var elementMark = [];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] == element){
			elementMark.push(i+1);
		}
	}
	return elementMark;
}

// 添加元素单击事件
function addElement_onclick(){
	var element = document.getElementById("element");
	var elementValue = element.value;
	var elements = document.getElementById("elsments");
	if(elementValue == null || elementValue.trim() ==""){
		alert("请输入内容！");
		return;
	}
	var elementArray = elementValue.split(",")
	for (var i = 0; i < elementArray.length; i++) {
		if (elementArray[i] == null || elementArray[i].trim() =="") {
			continue;
		}
		arr.push(elementArray[i].trim());
	}
	
	element.value = "";
	element.focus();
	// console.log(arr.toString());
	elements.innerHTML = arr.toString();
}
// 查找元素单击事件
function findElement_onclick(){
	if (arr.length == 0) {
		alert("请添加元素！");
		return;
	}
	var resultElement = findMostElement(arr);
	var result = document.getElementById("result");
	var resultString = "结果：出现最多的元素为：" + resultElement;
	var resultMark = findElementRemark(arr, resultElement[0]);
	console.log(resultElement[0], resultMark);
	resultString += "<br/>出现最多的次数：" + resultMark.length;
	resultString += "<br/>元素["+resultElement[0]+"]的顺序：" + resultMark;
	for (var i = 1; i < resultElement.length; i++) {
		resultMark = findElementRemark(arr, resultElement[i]);
		console.log(resultElement[i], resultMark);
		resultString += "<br/>元素["+resultElement[i]+"]的顺序：" + resultMark;
	}
	result.innerHTML =  resultString;
}

function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

// 示例
var testArr = ["a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a"];
var testResultElement = findMostElement(testArr);
var testResultMark = findElementRemark(testArr, testResultElement[0]);
var example = document.getElementById("example");
var testExample = "数组[\"a\", \"x\", \"b\", \"d\", \"m\", \"a\", \"k\", \"m\", \"p\", \"j\", \"a\"]";
testExample += "<br/>结果：出现最多的元素为：" + testResultElement[0];
testExample += "<br/>出现最多的次数：" + testResultMark.length;
for (var i = 1; i < testResultElement.length; i++) {
	testResultMark = findElementRemark(arr, testResultElement[i]);
	// console.log(testResultElement[i], testResultMark);
	testExample += "<br/>元素["+testResultElement[i]+"]的顺序：" + testResultMark;
}

testExample += "<br/>该元素的顺序：" + testResultMark;
example.innerHTML = testExample;