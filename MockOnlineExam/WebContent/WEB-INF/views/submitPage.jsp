<html>
<head>
<title>Your Score</title>
<link rel="stylesheet" href="submit_files/mock_style.css">
	<link rel="stylesheet" href="css/number_style.css">
	<link rel="stylesheet" href="css/keyboard_style.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.css">
	<link rel="stylesheet" type="text/css" href="css/aecInstructions.css">
</head>
<body>
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
<table id="confirmation_buttons" style="margin-top: 5%" align="center">
	<tbody>
		<tr>
			<td colspan="2">Are you sure you want to submit the Exam ?</td>
		</tr>
		<tr>
			<td style="text-align: center"><input
				onclick="finalSubmit('group')" class="button" style="width: 50px"
				value="Yes" type="button"></td>
			<td style="text-align: center"><input
				onclick="showModule('questionCont');doCalculations(0,0);removeActiveLinks();"
				class="button" style="width: 50px" value="No" type="button"></td>
		</tr>
	</tbody>
</table>
</center>
</div>
</body>
</html>