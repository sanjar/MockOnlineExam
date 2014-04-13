package com.nasrays.onlinemocktest.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.nasrays.onlinemocktest.model.Course;
import com.nasrays.onlinemocktest.model.QuestionAnswer;
import com.nasrays.onlinemocktest.model.Subject;



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
		      String url="jdbc:mysql://54.215.148.52:3306/sql336214";
		       String user="sql336214";
		       String password="zV6*iE2%"; 
		      DataSource ds=null;
		      try {
		    	 Class.forName("com.mysql.jdbc.Driver");
		        con = DriverManager.getConnection(url, user, password);
		         /*Context c = new InitialContext(); 
		         ds = (DataSource)c.lookup("java:comp/env/jdbc/database_mock_test");
		         con = ds.getConnection();*/
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
			ResultSet rs = null;
		      PreparedStatement pst = null;
		      Connection con = getConnection();
		      
		      String query = "select * from question_answer";
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

	
}
