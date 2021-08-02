package com.own.config;

import com.own.repository.UserRepository;
import com.own.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .configurationSource(this.getCorsConfigurationSource())

                .and()
                .authorizeRequests()
                .antMatchers("/rest/v1/**").permitAll()
                .antMatchers("/rest/v1/positions").permitAll()
                .antMatchers("/rest/v1/users/add").permitAll()
                .antMatchers("/rest/v1/users/login").permitAll()
                .antMatchers("/rest/v1/users/logoff").authenticated()
                .antMatchers("/rest/v1/users/*").hasRole("USER")

                //todo: require additional check for username match. currently skips security altogether.
                .antMatchers("/rest/v1/user/{userName}").authenticated()
                .antMatchers("/").hasRole("ADMIN")

                .and()
                //todo: investigate csrf.
                .csrf().disable()
                .headers().frameOptions().disable()

                .and()
                .formLogin()
                .loginProcessingUrl("/rest/v1/users/login") //the URL on which the clients should post the login information
                .usernameParameter("username") //the username parameter in the queryString, default is 'username'
                .passwordParameter("password") //the password parameter in the queryString, default is 'password'
                .successHandler(this::successHandler)
                .failureHandler(this::failureHandler)

                .and()
                .logout()
                .logoutUrl("/rest/v1/users/logoff") //the URL on which the clients should post if they want to logout
                .logoutSuccessUrl("/")
                .logoutSuccessHandler(this::logoutHandler)
                .invalidateHttpSession(true);
    }

    public CorsConfigurationSource getCorsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    public void successHandler(HttpServletRequest httpServletRequest,
                               HttpServletResponse httpServletResponse,
                               Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        System.out.println(userDetails.getUsername() + " logged in!!!");

        //todo: might be a good idea to return User entity right there without redirect.
        try {
            httpServletResponse.sendRedirect("/rest/v1/users/user/"+userDetails.getUsername());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void failureHandler(HttpServletRequest httpServletRequest,
                               HttpServletResponse httpServletResponse,
                               AuthenticationException e)
            throws IOException{

        System.out.println("log in failure");
        httpServletResponse.getWriter().append("Authentication failure");
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    public void logoutHandler(HttpServletRequest httpServletRequest,
                              HttpServletResponse httpServletResponse,
                              Authentication authentication) {

        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        System.out.println("logged out!!!");
    }

}
