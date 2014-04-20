package com.nasrays.onlinemocktest.controller;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.nasrays.onlinemocktest.dao.MockTestDao;
import com.nasrays.onlinemocktest.model.QuestionAnswer;
import com.nasrays.onlinemocktest.model.Subject;
import com.nasrays.onlinemocktest.model.UserDetails;
import com.nasrays.onlinemocktest.model.UserQuestionAnswerResponse;
import com.nasrays.onlinemocktest.utils.Constants;

@Controller
public class SubmitExamController {

	private MockTestDao mtDao = new MockTestDao();
	@RequestMapping(value="examCompleted")
	public ModelAndView examCompleted(
			ModelMap model,@RequestParam Map<String, String> allRequestParams,HttpServletRequest request) {
		
		ModelAndView mav = new ModelAndView();
		
		mav.setViewName("examCompleted");
		UserDetails userDetails = (UserDetails)request.getSession().getAttribute("userDetails");
		saveUserDetails(userDetails);
		saveSubmittedExam(request,userDetails.getEmail(),userDetails.getTestIdTaken());
		
		sendExamResultViaMail(userDetails.getEmail(),(List<Subject>)request.getSession().getAttribute("testList"),userDetails);
		model.addAttribute("userEmailId", userDetails.getEmail());
		request.getSession().invalidate();
		
		return mav;
	}

	private void saveUserDetails(UserDetails userDetails) {
		
		mtDao.saveUserDetails(userDetails);
		
	}

	private void saveSubmittedExam(HttpServletRequest request, String emailId, String testId) {
		int noOfCorrectAnswer=0;
		int noOfWrongAnswer=0;
		int noOfUnanswered=0;
		Map<Integer,QuestionAnswer> map=(Map<Integer, QuestionAnswer>) request.getSession().getAttribute("mapOfQuestionAndAnswer");
		Map<String,UserQuestionAnswerResponse> map2= (Map<String, UserQuestionAnswerResponse>) request.getSession().getAttribute("userResponseMap");
		for(String s: map2.keySet()){
			if(Constants.ANSWERED.equalsIgnoreCase(map2.get(s).getQuestionStatus())){
				if(map.get(Integer.valueOf(s)).getCorrectanswer().equalsIgnoreCase(map2.get(s).getUserChosenAnswer())){
					noOfCorrectAnswer++;
				}
				else{
					noOfWrongAnswer++;
				}
				
			}
			else if(Constants.NOT_ANSWERED.equalsIgnoreCase(map2.get(s).getQuestionStatus())){
				noOfUnanswered++;
			}
		}
		mtDao.saveUserSubmittedExam(emailId,testId,noOfCorrectAnswer,noOfWrongAnswer,noOfUnanswered,noOfCorrectAnswer>=map.size()/2);
	}

	private void sendExamResultViaMail(String emailId, List<Subject> testList, UserDetails userDetails) {
		String testName="";
		for(Subject sub:testList){
			if(sub.getSubjectId().equalsIgnoreCase(userDetails.getTestIdTaken())){
				testName=sub.getSubjectName();
			}
		}
		final String username = "nasraysinfo@gmail.com";
		final String password = "test123test";
 
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
		
		Session session = Session.getInstance(props,
				  new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				  });
		 
				try {
		 
					Message message = new MimeMessage(session);
					message.setFrom(new InternetAddress("demo@gmail.com"));
					message.setRecipients(Message.RecipientType.TO,
						InternetAddress.parse(emailId));
					message.setSubject("Exam Result of Test: "+testName);
					message.setText("Dear "+userDetails.getName()
						+ "\n\n Here is your result.!");
		 
					Transport.send(message);
		 
				} catch (MessagingException e) {
					throw new RuntimeException(e);
				}
	}
}
