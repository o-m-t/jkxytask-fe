// 根据分数分组
function scoreGrouping(score){
	// 分数大于100 或者 分数小于0
	if(score > 100 || score < 0){
		// alert("请输入0到100的数值！");
		return "错误";
	}
	// 分数0到100
	else if(score <= 100 && score >= 0){
		if (score <= 100 && score >= 90) {
			return "一等生"
		} else if (score < 90 && score >= 80) {
			return "二等生"
		} else if (score < 80 && score >= 70) {
			return "三等生"
		} else if (score < 70 && score >= 60) {
			return "四等生"
		} else if (score < 60 && score >= 50) {
			return "五等生"
		} else if (score < 50 && score >= 40) {
			return "六等生"
		} else if (score < 40 && score >= 30) {
			return "七等生"
		} else if (score < 30 && score >= 20) {
			return "八等生"
		} else if (score < 20 && score >= 10) {
			return "九等生"
		} else if (score < 10 && score >= 0) {
			return "十等生"
		}
	}
	
}

// 分组按钮单击事件
function group_onclick(){
	var score = document.getElementById("score").value;
	var result = document.getElementById("result");
	if(isNaN(score)){
		alert("请输入正确数值！");
		result.innerHTML = "";
		return;
	} else {
		if (!score) {
			alert("请输入0到100的数值！");
			result.innerHTML = "";
			return;
		} else if (score < 0 || score > 100) {
			alert("请输入0到100的数值！");
			result.innerHTML = "";
			return;
		} else {
			result.innerHTML = "分数:" + score + " 等级：" + scoreGrouping(score);
		}
	}
}

// document.write("110分:"+scoreGrouping(110)+"</br>");
// document.write("100分:"+scoreGrouping(100)+"</br>");
// document.write("85分:"+scoreGrouping(85)+"</br>");
// document.write("70分:"+scoreGrouping(70)+"</br>");
// document.write("63分:"+scoreGrouping(63)+"</br>");
// document.write("40分:"+scoreGrouping(40)+"</br>");
// document.write("-30分:"+scoreGrouping(-30)+"</br>");


