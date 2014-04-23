package com.nasrays.onlinemocktest.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class DisableBackButtonFilter implements Filter {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse res,
			FilterChain filterChain) throws IOException, ServletException {
		
		if(Boolean.valueOf(request.getParameter("submitRequest"))){
			 HttpServletResponse response=(HttpServletResponse)res;
			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	        response.setHeader("Pragma", "no-cache");
	        response.setDateHeader("Expires", -1);
	        filterChain.doFilter(request, response);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
