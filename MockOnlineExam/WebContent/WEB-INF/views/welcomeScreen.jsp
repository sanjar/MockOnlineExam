<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html><head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Welcome, Read Instructions</title>
	<link rel="stylesheet" href="css/mock_style.css">
	<link rel="stylesheet" href="css/keyboard.css">
	<link rel="stylesheet" href="css/number_style.css">
	<link rel="stylesheet" type="text/css" href="css/aecInstructions.css">
    <script src="js/keyboard.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/top.js"></script>
	<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
	<style>
		#instPaginationa:hover{ text-decoration:underline; }
		#readylink:hover { text-decoration:underline; }
	</style>
	<script>
	$(document).ready(function(){
		disable_scroll();
		$('select').css('cursor','url("BLACK.cur")');
	});
		function createDefaultSubject(defLang){
			var defaultLang = document.getElementById("defaultLanguage");
			var date = new Date();
			date.setTime(date.getTime()+(5*60*1000));
			var expires = "; expires="+date.toGMTString();		
			document.cookie = "defaultLang"+"="+defLang+expires+"; path=/";
		}

		function showId() {
			var url = document.URL;
			var params = url.split("instructions.html?");
			var orgId = $.trim(params[1]).split("@@")[0];
			var mockId = $.trim(params[1]).split("@@")[1];
			if(mockId.indexOf("#")>-1){
				mockId = mockId.substring(0,mockId.indexOf("#"));
			}
			if(document.getElementById("defaultLanguage").options.length>2){
				var lang = document.getElementById("defaultLanguage");
				if(lang.value!='0'){
					createDefaultSubject(lang.value);
					window.location.href="quiz.html?"+orgId+"@@"+mockId;
				}else {
					alert("Please choose your default language.");
				}
			}else{
				createDefaultSubject($('#defaultLang').val());
				window.location.href="quiz.html?"+orgId+"@@"+mockId;
			}
		}

		var page="next";
		function showInstr(){
			if(page=="next"){
				$("#firstPage").hide();
				$("#secondPagep1").show();
				$("#secondPagep2").show();
				page="previous";
				$("#instPaginationa").text("<< Previous");
			}else if(page=="previous"){
				$("#secondPagep1").hide();
				$("#secondPagep2").hide();
				$("#firstPage").show();
				page="next";
				$("#instPaginationa").text("Next >>");
			}
		}

		function linkdisp(){
			if(document.getElementById("disclaimer").checked==true){
				document.getElementById("readylink").removeAttribute("disabled",0);
				$('#readylink').click(function(){showId()});
			}else {
				document.getElementById("readylink").disabled="disabled";
				$('#readylink').unbind('click');
			}
		} 
	

		function basInst(param){
			if(param=='instEnglish'){
				$('#instEnglish').show();
				$('#instHindi').hide();
			}else{
				$('#instEnglish').hide();
				$('#instHindi').show();
			}
		}
		checkVersion();
		$(window).load(function(){ setInstruHeights();});

		window.onresize = function(event) {
			setInstruHeights();
		}
	</script>
</head>

<body onload="validateInstPageUrl();setInstruHeights();" onselectstart="return false;" ondragstart="return false;">
	<div id="container">
		<div id="pWait" style="background: none repeat scroll 0% 0% grey; height: 100%; width: 100%; z-index: 1999; position: absolute; opacity: 0.4; display: none;">
			<div style="top:45%;position:relative;color:white">
			<center><img src="welcome_files/loading.gif" style="height:50px;width:50px;display:block;"><br><h2>Please wait</h2></center>
			</div>
		</div>

		<div id="header">
			 <table cellpadding="0" cellspacing="0" border="0" width="100%">
				<tbody>
				  <tr>
					<td id="bannerImage" align="center"><div style="margin-top:10px"><font color="#ffffff" size="4"><b>Online Assessment Mock Test</b></font></div></td>
				  </tr>
				</tbody>
			  </table>
		</div>
		<div id="mainleft" style="margin-left: 3px; width: 79%; height: 974px;">
				<div id="firstPage" style="overflow: auto; border: 1px solid rgb(204, 204, 204); padding: 2px; height: 80%;">
				<br>
				
				<br>
				<div id="sysInstText1" style="height: 93%; width: 99.5%; overflow: auto;">
				<b><a id="instPaginationa" href="mytest" style="float:right">Next &gt;&gt;</a></b>
				<p align="center"><strong><span><b>Please read the following instructions carefully</b></span></strong></p>
<p><strong><u>General Instructions:</u></strong> <br></p>
<ol>
<li>Total of 30 minutes duration will be given to attempt all the questions</li>
<li>The clock has been set at the server and the countdown timer at the 
top right corner of your screen will display the time remaining for you 
to complete the exam. When the clock runs out the exam ends by default -
 you are not required to end or submit your exam. </li>
<li>The question palette at the right of screen shows one of the following statuses of each of the questions numbered: 
<table>
<tbody>
<tr>
<td valign="top"><span style="PADDING-TOP: 5px" id="tooltip_not_visited">1</span></td>
<td>You have not visited the question yet.</td></tr></tbody></table>
<table>
<tbody>
<tr>
<td valign="top"><span style="PADDING-TOP: 5px" id="tooltip_not_answered">3</span></td>
<td>You have not answered the question.</td></tr></tbody></table>
<table>
<tbody>
<tr>
<td valign="top"><span style="PADDING-TOP: 5px" id="tooltip_answered">5</span></td>
<td>You have answered the question. </td></tr></tbody></table>
<table>
<tbody>
<tr>
<td valign="top"><span style="PADDING-TOP: 5px" id="tooltip_review">7</span></td>
<td>You have NOT answered the question but have marked the question for review.</td></tr></tbody></table>
<table>
<tbody>
<tr>
<td valign="top"><span style="PADDING-TOP: 12px" id="tooltip_reviewanswered">&nbsp;&nbsp;&nbsp; 9</span></td>
<td>You have answered the question but marked it for review. </td></tr></tbody></table></li>
<li style="LIST-STYLE-TYPE: none">The Marked for Review status simply acts as a reminder that you have set to look at the question again. <font color="red"><i>If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.</i></font></li></ol>
<p><br><b><u>Navigating to a question : </u></b></p>
<ol start="4">
<li>To select a question to answer, you can do one of the following: 
<ol type="a">
<li>Click on the question number on the question palette at the right of
 your screen to go to that numbered question directly. Note that using 
this option does NOT save your answer to the current question. </li>
<li>Click on Save and Next to save answer to current question and to go to the next question in sequence.</li>
<li>Click on Mark for Review and Next to save answer to current 
question, mark it for review, and to go to the next question in 
sequence.</li></ol></li>
<li>You can view the entire paper by clicking on the <b>Question Paper</b> button.</li></ol>
<p><br><b><u>Answering questions : </u></b></p>
<ol start="6">
<li>For multiple choice type question : 
<ol type="a">
<li>To select your answer, click on one of the option buttons</li>
<li>To change your answer, click the another desired option button</li>
<li>To save your answer, you MUST click on <b>Save &amp; Next</b> </li>
<li>To deselect a chosen answer, click on the chosen option again or click on the <b>Clear Response</b> button.</li>
<li>To mark a question for review click on <b>Mark for Review &amp; Next</b>. <font color="red"><i>If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation. </i></font></li></ol></li>
<li>To change an answer to a question, first select the question and then click on the new answer option followed by a click on the <b>Save &amp; Next</b> button.</li>
<li>Questions that are saved or marked for review after answering will ONLY be considered for evaluation.</li></ol>
<p><br><b><u>Navigating through sections : </u></b></p>
<ol start="9">
<li>Sections in this question paper are displayed on the top bar of the 
screen. Questions in a section can be viewed by clicking on the section 
name. The section you are currently viewing is highlighted.</li>
<li>After clicking the <b>Save &amp; Next</b> button on the last question for a section, you will automatically be taken to the first question of the next section. </li>
<li>You can move the mouse cursor over the section names to view the status of the questions for that section. </li>
<li>You can shuffle between sections and questions anytime during the examination as per your convenience. </li></ol></div></div>
				<div id="instPagination"><center><b><a id="instPaginationa" href="mytest">Next &gt;&gt;</a></b></center></div>
		</div>
	</div>
	<script>
	
</script>
<div id="footer"><div style="width:100%;padding-top:15px;"><center><font color="white"> Version : 10.00.02</font></center></div></div>
<input id="defaultLang" value="12" type="hidden">

</body></html>