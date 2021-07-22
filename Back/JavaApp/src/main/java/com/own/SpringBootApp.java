package com.own;

import com.own.entity.Role;
import com.own.entity.User;
import com.own.exception.UserLoginAlreadyExistsException;
import com.own.repository.RoleRepository;
import com.own.service.UserService;
import org.springframework.beans.BeansException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;

@SpringBootApplication
public class SpringBootApp implements ApplicationContextAware {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootApp.class, args);
    }

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/login").allowedOrigins("http://localhost:4200");
            }
        };
    }

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        //do something on startup
    }
}
