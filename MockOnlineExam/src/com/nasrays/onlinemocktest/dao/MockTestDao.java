package com.nasrays.onlinemocktest.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.nasrays.onlinemocktest.model.Course;
import com.nasrays.onlinemocktest.model.QuestionAnswer;
import com.nasrays.onlinemocktest.model.Subject;
import com.nasrays.onlinemocktest.model.UserDetails;



public class MockTestDao {

	public List<Course> getCourses() {
		 ResultSet rs = null;
	      PreparedStatement pst = null;
	      Connection con = getConnection();
	      
	      String query = "select * from course";
	      List<Course> courses = new ArrayList<Course>();
	      try {
				pst = con.prepareStatement(query);
				if(pst.execute()){
					rs = pst.getResultSet();
				}
				while(rs.next()){
					Course c = new Course();
					c.setCourseId(rs.getString("courseid"));
					c.setCourseName(rs.getString("coursename"));
					courses.add(c);
				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return courses;
	}
	
	

		   public Connection getConnection(){
		      Connection con = null;
              
		      /*String url = "jdbc:mysql://118.139.168.61:3306/ngogupta";
		      String user = "ngogupta";
		      String password = "anoop#421MAN";*/
		      /*String url="jdbc:mysql://54.215.148.52:3306/sql336214";
		       String user="sql336214";
		       String password="zV6*iE2%"; */
		      DataSource ds=null;
		      try {
		    	 /*Class.forName("com.mysql.jdbc.Driver");
		        con = DriverManager.getConnection(url, user, password);*/
		         Context c = new InitialContext(); 
		         ds = (DataSource)c.lookup("java:comp/env/jdbc/database_mock_test");
		         con = ds.getConnection();
		         System.out.println("Connection completed.");
		      } catch (Exception ex) {
		    	  ex.printStackTrace();
		         System.out.println(ex.getMessage());
		      }
		      finally{
		      }
		      return con;
		   }



		public List<Subject> getSubjects(String courseId) {
			
			ResultSet rs = null;
		      PreparedStatement pst = null;
		      Connection con = getConnection();
		      
		      String query = "select * from course_subject where courseid=" +"'"+courseId+"'";
		      List<Subject> subjects = new ArrayList<Subject>();
		      try {
					pst = con.prepareStatement(query);
					if(pst.execute()){
						rs = pst.getResultSet();
					}
					while(rs.next()){
						Subject s = new Subject();
						s.setCourseId(rs.getString("courseid"));
						s.setSubjectName(rs.getString("subjectname"));
						s.setSubjectId(rs.getString("subjectid"));
						subjects.add(s);
					}
					
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return subjects;
		}



		public Map<Integer, QuestionAnswer> getQuestionAndAnswer() {
			String query = "select * from question_answer";
			return getQuestions(query);
		}



		private Map<Integer, QuestionAnswer> getQuestions(String query) {
			  ResultSet rs = null;
		      PreparedStatement pst = null;
		      Connection con = getConnection();
		      
		      
		      List<QuestionAnswer> qas = new ArrayList<QuestionAnswer>();
		      Map<Integer,QuestionAnswer> map = new HashMap<Integer,QuestionAnswer>();
		      try {
					pst = con.prepareStatement(query);
					if(pst.execute()){
						rs = pst.getResultSet();
					}
					int i =1;
					while(rs.next()){
						QuestionAnswer qa = new QuestionAnswer();
						qa.setQuestionId(rs.getString("questionid"));
						qa.setQuestion(rs.getString("question"));
						qa.setOption1(rs.getString("option1"));
						qa.setOption2(rs.getString("option2"));
						qa.setOption3(rs.getString("option3"));
						qa.setOption4(rs.getString("option4"));
						qa.setCorrectanswer(rs.getString("correctanswer"));
						qa.setTestId(rs.getString("testid"));
						qas.add(qa);
						map.put(i++, qa);
					}
					
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return map;
		}



		public Map<Integer, QuestionAnswer> getQuestionAndAnswer(String subjectId) {
			
			String query = "select * from question_answer where testid="+"'"+subjectId+"'";
			return getQuestions(query);
		}



		public List<Subject> getTestLists() {
			ResultSet rs = null;
		      PreparedStatement pst = null;
		      Connection con = getConnection();
		      
		      String query = "select * from course_subject";
		      List<Subject> tests = new ArrayList<Subject>();
		      try {
					pst = con.prepareStatement(query);
					if(pst.execute()){
						rs = pst.getResultSet();
					}
					while(rs.next()){
						Subject subject = new Subject();
						subject.setCourseId(rs.getString("courseid"));
						subject.setSubjectId(rs.getString("subjectid"));
						subject.setSubjectName(rs.getString("subjectname"));
						tests.add(subject);
						
					}
					
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return tests;
		}



		public void saveUserDetails(UserDetails userDetails) {
			 Connection con = getConnection();
			 try {
				 ResultSet rs = null;
				 PreparedStatement statement = null;
				 String selectQuery = "select * from user_test where emailid=" + "'"+userDetails.getEmail()+"'";
				 statement = con.prepareStatement(selectQuery);
				 String query;
				 boolean isUpdateQuery=false;
				 String testIds="";
				 if(statement.execute() && statement.getResultSet().next()){
					 String tests=statement.getResultSet().getString("testid");
					 String[] arrayOfTestIds=tests.split(",");
					 if(!Arrays.asList(arrayOfTestIds).contains(userDetails.getTestIdTaken())){
						 testIds=tests+",";
					 }
					 query = "update user_test set username=?,testid=?,address=?,dateofbirth=?,institutionname=? where emailid=?";
					 isUpdateQuery=true;
				 }
				 else{
					 query = "insert into user_test(username,testid,emailid,address,dateofbirth,institutionname) values(?,?,?,?,?,?)";
				 }
				 
				 
				PreparedStatement statement1 = con.prepareStatement(query);
				int i=1;
				statement1.setString(i++, userDetails.getName());
				statement1.setString(i++, testIds+userDetails.getTestIdTaken());
				if(!isUpdateQuery){
					statement1.setString(i++, userDetails.getEmail());
				}
				statement1.setString(i++, userDetails.getAddress());
				statement1.setString(i++, userDetails.getDateOfBirth());
				statement1.setString(i++, userDetails.getInstitutionName());
				if(isUpdateQuery){
					statement1.setString(i++, userDetails.getEmail());
				}
				statement1.executeUpdate();
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}



		public void saveUserSubmittedExam(String emailId,
				String testId, int noOfCorrectAnswer, int noOfWrongAnswer, int noOfUnanswered,
				boolean isPass) {
			Connection con = getConnection();
			PreparedStatement statement = null;
			ResultSet rs = null;
			 String selectQuery = "select * from user_test where emailid=" + "'"+emailId+"'";
			 try {
				statement = con.prepareStatement(selectQuery);
				String userId = "";
				if(statement.execute()){
					rs= statement.getResultSet();
					while(rs.next()){
					userId= rs.getString("userid");
					}
				}
				String query = "insert into user_test_result(userid,testid,noofcorrectans,noofwrongans,noofunanswered,marksobtained,result) values(?,?,?,?,?,?,?)";
				statement = con.prepareStatement(query);
				statement.setString(1,userId);
				statement.setString(2,testId);
				statement.setInt(3,noOfCorrectAnswer);
				statement.setInt(4,noOfWrongAnswer);
				statement.setInt(5,noOfUnanswered);
				statement.setInt(6,noOfCorrectAnswer*1);
				statement.setString(7,isPass?"Pass":"Fail");
				statement.executeUpdate();
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}

	
}
