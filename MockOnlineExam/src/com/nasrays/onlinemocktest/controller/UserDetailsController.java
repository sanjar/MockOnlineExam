package com.nasrays.onlinemocktest.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.nasrays.onlinemocktest.dao.MockTestDao;
import com.nasrays.onlinemocktest.model.Subject;

@Controller
public class UserDetailsController {

	@RequestMapping(value="enterUserDetails")
	public ModelAndView examCompleted(
			ModelMap model,HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		MockTestDao mtDao = new MockTestDao();
		List<Subject> testList= mtDao.getTestLists();
		model.addAttribute("testList", testList);
		request.getSession().setAttribute("testList", testList);
		mav.setViewName("userDetails");
		return mav;
	}
}
