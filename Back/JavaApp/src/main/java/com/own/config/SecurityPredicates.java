package com.own.config;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component("securityPredicates")
public class SecurityPredicates {
    public boolean userNameMatch(Authentication authentication, String username) {

        return username.equalsIgnoreCase(authentication.getName());
    }
}
