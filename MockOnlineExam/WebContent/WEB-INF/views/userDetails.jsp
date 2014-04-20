<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="css/mock_style.css">
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript">
function onsubmitform()
{
	var fieldMissing = false;
	if(!$('#emailid').val()){
		$('#emailmissing').show();
		fieldMissing=true;
	}
	else{
		$('#emailmissing').hide();
	}
	if(!$('#username').val()){
		$('#namemissing').show();
		fieldMissing=true;
	}
	else{
		$('#namemissing').hide();
	}
	if(!$('#dateofbirth').val()){
		$('#dobmissing').show();
		fieldMissing=true;
	}
	else{
		$('#dobmissing').hide();
	}
	if($('#tests :selected').val()==-1){
		$('#testmissing').show();
		fieldMissing=true;
	}
	else{
		$('#testmissing').hide();
	}
	if(!fieldMissing){
		document.userDetailsForm.action="mytest";
	}
	else{
		return false;
	}
  return true;
}

</script>
</head>
  <body bgcolor="skyblue">
    <div><b>Welcome to Online Mock Test.</b> </div>
    <div>Please fill following details and choose the test you want to take. * marked fields are mandatory.</div>
    
    <div>
    	<form name="userDetailsForm" method="post" onsubmit="return onsubmitform();">
    		<table>
    			<tr>
    				<td><b>Enter your Name<strong style="color:red">*</strong> : </b></td>
    				<td><input name="username" id="username"/></td>
    				<td id="namemissing" style="display:none;color:red">Name field is required.</td>
    			</tr>
    			<tr>
    				<td><b>Enter your Date of Birth<strong style="color:red">*</strong> : </b></td>
    				<td><input name="dateofbirth" id="dateofbirth"/></td>
    				<td id="dobmissing" style="display:none;color:red">Date of Birth field is required.</td>
    			</tr>
    			<tr>
    				<td><b>Enter your Institution Name : </b></td>
    				<td><input name="institutionname" id="institutionname"/></td>
    			</tr>
    			<tr>
    				<td><b>Enter your Address : </b></td>
    				<td><input name="address" id="address"/></td>
    			</tr>
    			<tr>
    				<td><b>Enter your Email - ID<strong style="color:red">*</strong> : </b></td>
    				<td><input name="emailid" id="emailid"/></td>
    				<td id="emailmissing" style="display:none;color:red">Email id field is required.</td>
    			</tr>
    			<tr>
    				<td><b>Choose Your Test : </b></td>
    				<td><select name="tests" id="tests">
    					<option value="-1">Select your Test</option>
   						 <c:forEach items="${testList}" var="test">
        						<option value="${test.subjectId}">${test.subjectName}</option>
    				     </c:forEach>
						</select>
					</td>
					<td id="testmissing" style="display:none;color:red">Test Selection field is required.</td>
    			</tr>
    			<tr><td><input name="takemyexam" class="button" value="Proceed to My Test >>" type="submit"/></td></tr>
    		</table>
    	</form>
    
    </div>
  </body>
</html>