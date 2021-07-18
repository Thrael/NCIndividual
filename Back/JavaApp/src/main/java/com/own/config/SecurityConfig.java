package com.own.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.own.additional.CustomUserDetails;
import com.own.entity.User;
import com.own.repository.UserRepository;
import com.own.service.CustomUserDetailsService;
//import com.own.service.PBKDF2EncoderCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;

import static com.sun.xml.internal.ws.spi.db.BindingContextFactory.LOGGER;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
//        auth.inMemoryAuthentication()
//                .withUser("user")
//                .password("pass")
//                .roles("ADMIN");
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .authorizeRequests()
//                .antMatchers("/rest/v1/users/**").hasRole("ADMIN")
//                .antMatchers("/rest/v1/**").hasRole("USER")
                .antMatchers("rest/v1/positions").permitAll()
                .antMatchers("/rest/v1/users/add").permitAll()
                .antMatchers("/rest/v1/users/login").permitAll()
                .antMatchers("/rest/v1/users/logoff").permitAll()
                .antMatchers("/rest/v1/users/*").hasRole("USER")
                .antMatchers("/").hasAnyRole("ADMIN", "USER")

                .and().csrf().disable()
                .headers().frameOptions().disable()


                .and().formLogin().successHandler(successHandler()).failureHandler(failureHandler());

    }

    @CrossOrigin(origins = "http://localhost:4200")
    private AuthenticationSuccessHandler successHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
//                httpServletResponse.getWriter().append("OK");
//                httpServletResponse.setStatus(200);
                httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
                MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
                ObjectMapper mapper = messageConverter.getObjectMapper();

                httpServletResponse.setStatus(HttpServletResponse.SC_OK);

                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

                User user = userRepository.findByUsername(userDetails.getUsername()).get();

                LOGGER.info(userDetails.getUsername() + " is connected");

                PrintWriter writer = httpServletResponse.getWriter();

                mapper.writeValue(writer, user.getRoles());

                writer.flush();
            }


        };
    }

    @CrossOrigin(origins = "http://localhost:4200")
    private AuthenticationFailureHandler failureHandler() {
        return new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
//                System.out.println(httpServletRequest.getUserPrincipal().toString());
//                System.out.println(httpServletRequest.getUserPrincipal().getName());
                System.out.println(httpServletRequest.getHeader("Content-Type"));
                System.out.println(httpServletRequest.getAuthType());
                System.out.println(httpServletRequest.getUserPrincipal());
                System.out.println(httpServletRequest.getServletContext().getAttributeNames());
                System.out.println(httpServletRequest.isSecure());
                httpServletResponse.getWriter().append("Authentication failure");
                httpServletResponse.setStatus(401);
            }
        };
    }


}
