package com.nasrays.onlinemocktest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.nasrays.onlinemocktest.dao.MockTestDao;
import com.nasrays.onlinemocktest.model.QuestionAnswer;
import com.nasrays.onlinemocktest.model.UserDetails;
import com.nasrays.onlinemocktest.model.UserQuestionAnswerResponse;
import com.nasrays.onlinemocktest.utils.Constants;


@Controller
@Scope(value="session")
public class StartTestController{

	private Integer currentQuestionCount=1;
	private Map<Integer,QuestionAnswer> mapOfQuestionAndAnswer;
	private Integer totalNoOfQuestions;
	private Map<String,UserQuestionAnswerResponse> userResponseMap = new HashMap<String, UserQuestionAnswerResponse>();
	private Integer count =1;
	
	@RequestMapping(value="welcome")
	public ModelAndView welcomeScreen(ModelMap model) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("welcomeScreen");
		return mav;
	}
	
	private void prepareUserResponse() {
		for(Integer i=1 ; i<=this.totalNoOfQuestions;i++){
			UserQuestionAnswerResponse r = new UserQuestionAnswerResponse();
			r.setQuestionId(mapOfQuestionAndAnswer.get(i).getQuestionId());
			r.setQuestionStatus(Constants.NOT_VISITED);
			r.setUserChosenAnswer("");
			userResponseMap.put(String.valueOf(i), r);
		}
		
	}

	@RequestMapping(value="mytest")
	public ModelAndView startMyMockTest(
			ModelMap model,
			@RequestParam(value = "quesNo", required = false, defaultValue = "1") Integer questionNo,
			@RequestParam Map<String, String> allRequestParams,HttpServletRequest request) {
		MockTestDao mtDao = new MockTestDao();
		ModelAndView mav = new ModelAndView();
		if(null !=allRequestParams.get("emailid")){
			UserDetails userDetails = new UserDetails();
			userDetails.setEmail(allRequestParams.get("emailid"));
			userDetails.setDateOfBirth(allRequestParams.get("dateofbirth"));
			userDetails.setAddress(allRequestParams.get("address"));
			userDetails.setInstitutionName(allRequestParams.get("institutionname"));
			userDetails.setName(allRequestParams.get("username"));
			userDetails.setTestIdTaken(allRequestParams.get("tests"));
			
			request.getSession().setAttribute("userDetails", userDetails);
			Map<Integer, QuestionAnswer> mapOfQuestionAndAnswer = mtDao
			.getQuestionAndAnswer(allRequestParams.get("tests"));
			setMapOfQuestionAndAnswer(mapOfQuestionAndAnswer);
		}
		if(null!=request.getSession() && null ==request.getSession().getAttribute("userDetails")){
			mav = new ModelAndView(new RedirectView("enterUserDetails"));
			return mav;
		}
		if (null == this.mapOfQuestionAndAnswer) {
			Map<Integer, QuestionAnswer> mapOfQuestionAndAnswer = mtDao
					.getQuestionAndAnswer();
			setMapOfQuestionAndAnswer(mapOfQuestionAndAnswer);
		}
		
		model.addAttribute("mapOfQuestionAndAnswer",
				this.mapOfQuestionAndAnswer);
		model.addAttribute("currentQuestionCount", questionNo);
		model.addAttribute("currentQuestionInString", String.valueOf(questionNo));
		this.totalNoOfQuestions = this.mapOfQuestionAndAnswer.keySet().size();
		model.addAttribute("totalNoOfQuestions", this.totalNoOfQuestions);
		mav.setViewName("startmytest");

		if (userResponseMap.isEmpty()) {
			prepareUserResponse();
		}
		if((!"back".equalsIgnoreCase(allRequestParams.get("requestAsked")) || questionNo>1) && null != allRequestParams.get("answer")){
			int questionToBeUpdated=questionNo-1;
			if("submit".equalsIgnoreCase(allRequestParams.get("requestAsked"))){
				questionToBeUpdated=questionNo;
			}
			this.userResponseMap.get(String.valueOf(questionToBeUpdated)).setQuestionStatus(Constants.ANSWERED);
			this.userResponseMap.get(String.valueOf(questionToBeUpdated)).setUserChosenAnswer(allRequestParams.get("answer"));
		}
		if("submit".equalsIgnoreCase(allRequestParams.get("requestAsked"))){
			List<Integer> list = getResponseList();
			model.addAttribute("userResponseList", list);
			request.getSession().setAttribute("mapOfQuestionAndAnswer", this.mapOfQuestionAndAnswer);
			request.getSession().setAttribute("userResponseMap", this.userResponseMap);
		}
		model.addAttribute("userResponseMap", this.userResponseMap);
		return mav;
	}

	
	private List<Integer> getResponseList() {
		int totalAnswered=0;
		int totalNotAnswered=0;
		int totalNotVisited=0;
		int totalMarkedForReview=0;
		int totalAnsweredButMarkedForReview=0;
		for(UserQuestionAnswerResponse response:userResponseMap.values()){
			if(Constants.ANSWERED.equals(response.getQuestionStatus())){
				totalAnswered++;
			}else if(Constants.NOT_ANSWERED.equals(response.getQuestionStatus())){
				totalNotAnswered++;
			}else if(Constants.NOT_VISITED.equals(response.getQuestionStatus())){
				totalNotVisited++;
			}else if(Constants.REVIEW.equals(response.getQuestionStatus())){
				totalMarkedForReview++;
			}
			else if(Constants.REVIEW_ANSWERED.equals(response.getQuestionStatus())){
				totalAnsweredButMarkedForReview++;
			}
		}
		
		List<Integer> list = new ArrayList<Integer>();
		list.add(totalAnswered);
		list.add(totalNotAnswered);
		list.add(totalNotVisited);
		list.add(totalMarkedForReview);
		list.add(totalAnsweredButMarkedForReview);
		return list;
	}

	public Map<Integer, QuestionAnswer> getMapOfQuestionAndAnswer() {
		return mapOfQuestionAndAnswer;
	}

	public void setMapOfQuestionAndAnswer(
			Map<Integer, QuestionAnswer> mapOfQuestionAndAnswer) {
		this.mapOfQuestionAndAnswer = mapOfQuestionAndAnswer;
	}

	

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Map<String, UserQuestionAnswerResponse> getUserResponseMap() {
		return userResponseMap;
	}

	public void setUserResponseMap(
			Map<String, UserQuestionAnswerResponse> userResponseMap) {
		this.userResponseMap = userResponseMap;
	}

	

	
}
