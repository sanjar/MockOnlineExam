<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="css/mock_style.css">
<link rel="stylesheet" href="css/number_style.css">
<link rel="stylesheet" href="css/keyboard_style.css">
<link rel="stylesheet" type="text/css" href="css/jquery.css">
<link rel="stylesheet" type="text/css" href="css/aecInstructions.css">

<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery.plugin.js"></script>
<script type="text/javascript" src="js/jquery.countdown.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		loadQuestionAnswers();
		var requestTimeLeft = <%=request.getSession().getAttribute("timeLeft")%>
		//alert(requestTimeLeft);
		$('#timeInMins').countdown({until:requestTimeLeft,compact: true, format: 'MS',description: ''});
	});
	function loadQuestionAnswers(){
		$(':radio[value="${userResponseMap[currentQuestionInString].userChosenAnswer}"]').attr('checked', 'checked');
	}
	
	function onsubmitform()
	{
		//alert($('#timeInMins').text());
		//alert($('#timeLeft').val());
		
	  if(document.pressed == 'noSubmit' || document.pressed == 'yesSubmit')	{
		  if(document.pressed == 'noSubmit'){
			  document.submitForm.action ="mytest?quesNo=1";
		  }
		  else{
			  document.questionForm.action ="examCompleted?session=logout";
		  }
	  }
	  if(document.pressed == 'back')
	  {
	   document.questionForm.action ="mytest?quesNo=${currentQuestionCount-1}";
	   $('#requestAsked').val("back");
	  }
	  else
	  if(document.pressed == 'savenext' || document.pressed == 'underreview')
	  {
		  document.questionForm.action ="mytest?quesNo=${currentQuestionCount+1}";
		  if(document.pressed == 'underreview'){
			  $('#requestAsked').val("underreview");
		  }
	  }
	  else
		  if(document.pressed == 'submit')
		  {
			  document.questionForm.action ="mytest?submitRequest=true";
			   $('#requestAsked').val("submit");
			   $('#quesNo').val("${currentQuestionCount}");
		  }
	  $('#timeLeft').val($('#timeInMins').text());
	  return true;
	}
	
	function prepareRequestURL(question){
		var timeLeft=$('#timeInMins').text();
		document.location.href = "mytest?quesNo=" + question + "&timeLeftFurther=" + timeLeft;
	}

</script>
<title>Assessment Exam Center</title>
<style>
#usefulData:hover {
	text-decoration: underline;
}
</style>
</head>
<body><!-- onload="validateQuizPageUrl();quizPageHeight();timer();"-->
<div id="container">
<div id="pWait"
	style="background: none repeat scroll 0% 0% grey; height: 100%; width: 100%; z-index: 1999; position: absolute; opacity: 0.4; display: none;">
<div style="top: 45%; position: relative; color: white">
<center><img src="images/loading.gif"
	style="height: 50px; width: 50px; display: block;"><br>
<h2>Please wait</h2>
</center>
</div>
</div>
<div id="header">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
	<tbody>
		<tr>
			<td id="bannerImage" align="center">
			<div style="margin-top: 10px"><font color="#ffffff" size="4"><b>Online
			Assessment Mock Test</b></font></div>
			</td>
		</tr>
	</tbody>
</table>
</div>
<div id="questionContent">
<div style="height: 699px;" id="mainleft">
<div id="groups" style="width: 99%; float: left;"></div>
<c:if test="${userResponseList!=null}">
<div style="height: 509px; display: block;" id="sectionSummaryDiv">
<center>
<h3><b>Exam Summary</b></h3>
<table class="bordertable" style="margin-top: 5%" cellspacing="0"
	align="center" width="80%">
	<tbody>
		<tr>
			<th>Section Name</th>
			<th>No. of Questions</th>
			<th>Answered</th>
			<th>Not Answered</th>
			<th>Not Visited</th>
			<th>Marked for Review</th>
			<th>Answered But Marked for Review</th>
			
		</tr>
		<tr>
			<td width="25%">General Awareness</td>
			<td width="15%">${totalNoOfQuestions}</td>
			<td width="15%">${userResponseList[0]}</td>
			<td width="15%">${userResponseList[1]}</td>
			<td width="15%">${userResponseList[2]}</td>
			<td width="15%">${userResponseList[3]}</td>
			<td width="15%">${userResponseList[4]}</td>
		</tr>
	</tbody>
</table>
</center>
<center>
<form name="submitForm" method="post" onsubmit="return onsubmitform();">
<input id="timeLeft" name="timeLeft" type="hidden" value=""/>
<table id="confirmation_buttons" style="margin-top: 5%" align="center">
	<tbody>
		<tr>
			<td colspan="2">Are you sure you want to submit the Exam ?</td>
		</tr>
		<tr>
			<td style="text-align: center"><input
				id="yesSubmit" class="button" value="Yes" type="submit" onclick="document.pressed=this.id"></td>
			<td style="text-align: center"><input
				id="noSubmit" class="button" style="width: 50px" value="No" type="submit" onclick="document.pressed=this.id"></td>
		</tr>
	</tbody>
</table>
</form>
</center>
</div>
</c:if>
<c:if test="${userResponseList== null && currentQuestionCount > totalNoOfQuestions}">
<div>
	<b> you have requested for wrong question. There are only ${totalNoOfQuestions} questions in this mock Test.</b>
</div>
</c:if>
<c:if test="${userResponseList== null && currentQuestionCount <= totalNoOfQuestions}">
<form name="questionForm" method="post" onsubmit="return onsubmitform();">
<div style="height: 633px;" id="questionCont">
<div style="height: 80%;" id="currentQues">
<c:set var="currentQues">${currentQuestionCount}</c:set>
<c:if test="${userResponseMap[currentQues].questionStatus=='not_visited'}">
	<c:set var="obj" value="${userResponseMap[currentQues]}"></c:set>
	<c:set target="${obj}" property="questionStatus" value="not_answered"></c:set>
</c:if>
<div style="height: 93%; width: 100%">
<div
	style="width: 98%; height: 6%; border-bottom: 1px solid #000000; margin: 5px;">
<div
	style="float: left; width: 49%; font-size: 1em; font-family: Arial, verdana, helvetica, sans-serif"><b>
Question No. ${currentQuestionCount}</b></div>
</div>
<div id="quesAnsContent" style="height: 92%; overflow: auto;">
<div
	style="width: 99%; margin-left: 5px; font-family: Arial, verdana, helvetica, sans-serif; padding-bottom: 10px;">
	${mapOfQuestionAndAnswer[currentQuestionCount].question}
</div>
<div
	style="width: 100%; font-family: Arial, verdana, helvetica, sans-serif; margin-top: 5px;">
<table>
	<tbody>
		<tr>
			<td><input onmousedown="this.check = this.checked" name="answer" id="answer_1"
				value="${mapOfQuestionAndAnswer[currentQuestionCount].option1}" type="radio"></td>
				
			
			<td
				style="font-family: Arial, verdana, helvetica, sans-serif; padding-right: 60px">
				${mapOfQuestionAndAnswer[currentQuestionCount].option1}
</td>
		</tr>
		<tr>
			<td><input name="answer" onmousedown="this.check = this.checked"
				name="answer" id="answer_1"name="answer" id="answer_2"
				value="${mapOfQuestionAndAnswer[currentQuestionCount].option2}" type="radio"></td>
			<td
				style="font-family: Arial, verdana, helvetica, sans-serif; padding-right: 60px">${mapOfQuestionAndAnswer[currentQuestionCount].option2}</td>
		</tr>
		<tr>
			<td><input onmousedown="this.check = this.checked"
				name="answer" id="answer_3"
				value="${mapOfQuestionAndAnswer[currentQuestionCount].option3}" type="radio"></td>
			<td
				style="font-family: Arial, verdana, helvetica, sans-serif; padding-right: 60px">${mapOfQuestionAndAnswer[currentQuestionCount].option3}</td>
		</tr>
		<tr>
			<td><input onmousedown="this.check = this.checked"
				name="answer" id="answer_4"
				value="${mapOfQuestionAndAnswer[currentQuestionCount].option4}" type="radio"></td>
			<td
				style="font-family: Arial, verdana, helvetica, sans-serif; padding-right: 60px">${mapOfQuestionAndAnswer[currentQuestionCount].option4}</td>
		</tr>
		
	</tbody>
</table>
</div>
</div>
</div>
</div>

<div id="actionButton"
	style="width: 99%; margin-left: 1%; margin-top: 5px; bottom: 0px">
<input id="requestAsked" name="requestAsked" type="hidden" value=""/>
	<a href="mytest?quesNo=${currentQuestionCount+1}" > 	
		<span style="float: left"><input id="underreview" class="button" value="Mark for Review &amp; Next" type="submit" onclick="document.pressed=this.id"></span>
	</a> 
	<c:if test="${currentQuestionCount > 1}">
	<a href="mytest?quesNo=${currentQuestionCount-1}"> 
		<span style="float: left"><input
		style="background-color: #3778BD; color: #FFFFFF; padding-top: 5px; padding-bottom: 5px; width: 180px; height: 35px"
		id="back" class="button"
		value="Back" type="submit" onclick="document.pressed=this.id"></span></a>
	</c:if>
	<c:if test="${currentQuestionCount < totalNoOfQuestions}">
	<a href="mytest?quesNo=${currentQuestionCount+1}" > 
		<span style="float: right"><input
		style="background-color: #3778BD; color: #FFFFFF; padding-top: 5px; padding-bottom: 5px; width: 180px; height: 35px"
		id="savenext" class="button"
		value="Save &amp; Next" type="submit" onclick="document.pressed=this.id"></span></a>
	</c:if>
	<input id="timeLeft" name="timeLeft" type="hidden" value=""/>
	<c:if test="${currentQuestionCount == totalNoOfQuestions}">
	 <input id="quesNo" name="quesNo" type="hidden"/>
		<span style="float: right"><input
		style="background-color: #3778BD; color: #FFFFFF; padding-top: 5px; padding-bottom: 5px; width: 180px; height: 35px"
		id="submit" class="button"
		value="Submit" type="submit" onclick="document.pressed=this.id"></span>
	</c:if>
	</form>
	</c:if>
	
	
	</div>
</div>
</div>
<div style="height: 699px;" id="mainright">
<div id="timer" style="height: 90px">
<div id="candImg"
	style="width: 40%; height: 75px; float: left; padding-top: 7px; padding-bottom: 7px;">
<center><img src="images/NewCandidateImage.jpg"
	id="candidateImg" height="70px" width="70px"></center>
</div>
<div style="width: 59%; height: 75px; float: left;">
<div style="margin-top: 20px; width: 100%;" id="showTime">
<b>Time
Left : <span id="timeInMins"></span></b></div>
<div style="width: 100%"><i>Candidate</i></div>
<div id="showCalc"
	style="display: none; height: 25px; width: 100px; position: relative;"><img
	src="images/Calculator-button.gif"
	style="height: 25px; width: 100px; cursor: pointer"
	onclick="loadCalculator()"></div>
</div>
</div>
<div id="loadCalc"
	style="display: none; z-index: 999; position: absolute"></div>
<div class="numberpanel" style="height: 609px;">

<div id="quesPallet" style="height: 5%; margin-left: 5px">Question
Palette :</div>
<div style="height: 369px;" id="numberpanelQues">
<center>
<table style="margin-top: -2%;" class="question_area " valign="top"
	cellpadding="0" cellspacing="0" border="0">
	<tbody>
	<c:set var="noOfRows" value="${fn:substringBefore((totalNoOfQuestions/4), '.')+1}"></c:set>
	
	
	<c:set var="questionInRow" value="${noOfRows}"></c:set>
		<c:forEach begin="1" end="${noOfRows}" var="rowCount" >
		<c:set var="questionInRow" value="${questionInRow-1}"></c:set>
		<tr>
			<c:if test="${questionInRow <1}">
				<c:set var="questionCount" value="${totalNoOfQuestions-((noOfRows-1)*4)}"></c:set>
			</c:if>
			<c:if test="${questionInRow >= 1}">
				<c:set var="questionCount" value="4"></c:set>
			</c:if>
			
			<c:forEach begin="1" end="${questionCount}" var="question" >
				<c:set var="count">${((rowCount-1)*4) +question}</c:set>
				<td id="qtd_${rowCount}_${question}"><a  onclick="prepareRequestURL('${((rowCount-1)*4) +question}')">
				<span title="${userResponseMap[count].questionStatus}" class="${userResponseMap[count].questionStatus}"
				id="span_${rowCount}_${question}"> ${((rowCount-1)*4) +question}</span> </a></td>
			</c:forEach>
		</tr>
		</c:forEach>
	</tbody>
</table>
</center>
</div>
<div id="legend" style="margin-left: 3px; margin: 5px">
<table class="diff_type_notation_area_inner" width="100%">
	<tbody>
		<tr>
			<td colspan="4"><b>Legend : </b></td>
		</tr>
		<tr>
			<td><span class="answered">&nbsp;</span></td>
			<td>Answered</td>
			<td><span class="not_answered">&nbsp;</span></td>
			<td>Not Answered</td>
		</tr>
		<tr>
			<td><span class="review">&nbsp;</span></td>
			<td>Marked</td>
			<td><span class="not_visited">&nbsp;</span></td>
			<td>Not Visited</td>
		</tr>
	</tbody>
</table>
<table width="100%">
	<tbody>
		<tr>
			<td width="50%">
			<center><input id="viewProButton" class="button1"
				value="Profile" title="View Profile"
				onclick="showModule('profileDiv');activeLink(this.id)" type="button">
			</center>
			</td>
			<td width="50%">
			<center><input id="viewInstructionsButton" class="button1"
				value="Instructions" title="View Instructions"
				onclick="showModule('instructionsDiv');activeLink(this.id)"
				type="button"></center>
			</td>
		</tr>
		<tr>
			<td id="viewQPTD" width="50%">
			<center><input id="viewQPButton" class="button1"
				value="Question Paper" title="View Entire Question Paper"
				onclick="showQP();activeLink(this.id)" type="button"></center>
			</td>
			<!--<td><center> <input type="button" class="button" style="width:110px" id="finalSub" onclick="submitConfirmation('submit')" value="Submit" title="Submit Exam" disabled/></center></td>-->
			<td id="submitTD" width="50%">
			<center><input class="button1" id="finalSub"
				onclick="submitConfirmation('submit');activeLink(this.id)"
				value="Submit" title="Submit Group" type="button"></center>
			</td>
		</tr>
	</tbody>
</table>
</div>
<div id="typingSubmit" style="display: none;">
<table width="100%">
	<tbody>
		<tr>
			<td id="submitTD" width="50%">
			<center><input class="button1" id="finalTypingSub"
				onclick="fnSubmit('NEXT');caculateEllapsedTime();submitConfirmation('submit');activeLink(this.id);"
				value="Submit" title="Submit Group" disabled="disabled"
				type="button"></center>
			</td>
		</tr>
	</tbody>
</table>
</div>
</div>
</div>
</div>
<div id="breakTimeDiv" style="display: none" align="center">
<div style="width: 100%; height: 75px; float: left;">
<div style="margin-top: 20px; width: 100%;" id="breakTimeCounter">
&nbsp;</div>
</div>
<div id="breakSummaryDiv"></div>
<div><input onclick="submitGroup()" class="button"
	value="Proceed to Next Group" type="button"></div>
<div class="clear"></div>
</div>
</div>

<div id="footer">
<div style="width: 100%; padding-top: 15px;">
<center><font color="white"> Version : 10.00.02</font></center>
</div>
</div>

</body>
</html>