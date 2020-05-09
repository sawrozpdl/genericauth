package com.generics.auth.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.generics.auth.exception.ErrorResponse;
import com.generics.auth.exception.HttpException;
import org.springframework.http.HttpStatus;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

public class Http {

    public static <T> void sendErrorResponse(HttpServletResponse response, HttpException object) throws IOException {
        response.setStatus(object.getHttpStatus().value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        ErrorResponse error = new ErrorResponse(object.getHttpStatus(), object.getMessage());
        error.setTimestamp(LocalDateTime.now());
        error.setStatus((HttpStatus.NOT_FOUND.value()));
        response.getWriter().write(new ObjectMapper()
                .writeValueAsString(error));
    }

    public static Cookie createCookie(String key, String content) {
        final Cookie cookie = new Cookie(key, content);
        cookie.setMaxAge(8640000);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

    public static Cookie removeCookie(String key) {
        final Cookie cookie = new Cookie(key, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

    public static String[] getInfo(HttpServletRequest request) {
        String  userAgent       = request.getHeader("User-Agent");
        String  user            =   userAgent.toLowerCase();

        String os = "";
        String browser = "";

        if (userAgent.toLowerCase().contains("windows")) {
            os = "Windows";
        } else if(userAgent.toLowerCase().contains("mac"))
        {
            os = "Mac";
        } else if(userAgent.toLowerCase().contains("x11"))
        {
            os = "Unix";
        } else if(userAgent.toLowerCase().contains("android"))
        {
            os = "Android";
        } else if(userAgent.toLowerCase().contains("iphone"))
        {
            os = "IPhone";
        }else{
            os = "UnKnown, More-Info: "+userAgent;
        }
        //===============Browser===========================
        if (user.contains("msie"))
        {
            String substring=userAgent.substring(userAgent.indexOf("MSIE")).split(";")[0];
            browser=substring.split(" ")[0].replace("MSIE", "IE")+"-"+substring.split(" ")[1];
        } else {
            String[] splitRes = userAgent.substring(userAgent.indexOf("Version")).split(" ");
            if (user.contains("safari") && user.contains("version"))
            {
                browser=(userAgent.substring(userAgent.indexOf("Safari")).split(" ")[0]).split("/")[0]+"-"+(splitRes[0]).split("/")[1];
            } else if ( user.contains("opr") || user.contains("opera"))
            {
                if(user.contains("opera"))
                    browser=(userAgent.substring(userAgent.indexOf("Opera")).split(" ")[0]).split("/")[0]+"-"+(splitRes[0]).split("/")[1];
                else if(user.contains("opr"))
                    browser=((userAgent.substring(userAgent.indexOf("OPR")).split(" ")[0]).replace("/", "-")).replace("OPR", "Opera");
            } else if (user.contains("chrome"))
            {
                browser=(userAgent.substring(userAgent.indexOf("Chrome")).split(" ")[0]).replace("/", "-");
            } else if ((user.contains("mozilla/7.0")) || (user.contains("netscape6"))  || (user.contains("mozilla/4.7")) || (user.contains("mozilla/4.78")) || (user.contains("mozilla/4.08")) || (user.contains("mozilla/3")) )
            {
                browser = "Netscape-?";

            } else if (user.contains("firefox"))
            {
                browser=(userAgent.substring(userAgent.indexOf("Firefox")).split(" ")[0]).replace("/", "-");
            } else if(user.contains("rv"))
            {
                browser="IE-" + user.substring(user.indexOf("rv") + 3, user.indexOf(")"));
            } else
            {
                browser = "UnKnown, More-Info: "+userAgent;
            }
        }
        return new String[] {os, browser};
    }
}
