package com.own.controller;

import com.own.entity.User;
import com.own.exception.UserLoginAlreadyExistsException;
import com.own.exception.UserNotFoundException;
import com.own.repository.UserRepository;
import com.own.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping(value = "/add", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public User addUser(@RequestBody User user) throws UserLoginAlreadyExistsException {
        return userService.signUp(user);
    }

    @GetMapping(value = "/user/{name}")
    public User loginUser(@PathVariable("name") String username) throws UserNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("not found"));
    }

    //todo: currently not invoked. security handler eats request.
    @PostMapping(value = "/logoff", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public void logoff() {
        userService.logoff();
    }
}
