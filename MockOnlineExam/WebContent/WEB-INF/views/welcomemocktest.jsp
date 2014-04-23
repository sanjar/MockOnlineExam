<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<html>
  <body>
	welcome to you Mock Test!!!!!
	<div>
	Following courses are available:
	<table border="blue">
		<tr>
			<td><b>Course Id</b></td>
			<td><b>Course Name</b></td>
		</tr>
		<c:forEach var="course" items="${courses}" varStatus="count">
			<tr>
				<td>${course.courseId}</td>
				<td id="course${count.index}"><a href="/MockOnlineExam/spring/mytest?courseId=${course.courseId}">${course.courseName}</a></td>
			</tr>
		</c:forEach>
	</table>
	</div>
	<c:if test="${!empty subjects}">
	<div >
		<b>Please Select your Subject:</b>
		<br/>
		<select id="subjectList" name="subjectList">
			<option value="h">
			 Please choose the subject
			</option>
			<c:forEach var="subject" items="${subjects}">
				<option value="${subject.subjectId}"><b>${subject.subjectName}</b></option>
			</c:forEach>
		</select>
	</div>
	</c:if>
	
	<div style="float:center">
		<b>Please take your test.</b>
	</div>
	<script type="text/javascript">
		
	</script>
  </body>
</html>
