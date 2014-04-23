package com.nasrays.onlinemocktest.model;

public class UserQuestionAnswerResponse {

	private String questionId;
	private String userChosenAnswer;
	private String questionStatus;
	
	public String getQuestionId() {
		return questionId;
	}
	public void setQuestionId(String questionId) {
		this.questionId = questionId;
	}
	public String getUserChosenAnswer() {
		return userChosenAnswer;
	}
	public void setUserChosenAnswer(String userChosenAnswer) {
		this.userChosenAnswer = userChosenAnswer;
	}
	public String getQuestionStatus() {
		return questionStatus;
	}
	public void setQuestionStatus(String questionStatus) {
		this.questionStatus = questionStatus;
	}
	
	
}
