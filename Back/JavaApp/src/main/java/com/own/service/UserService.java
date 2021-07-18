package com.own.service;

import com.own.additional.CustomUserDetails;
import com.own.entity.User;
import com.own.exception.UserLoginAlreadyExistsException;
import com.own.exception.UserNotFoundException;
import com.own.repository.RoleRepository;
import com.own.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    //@Autowired
    private Pbkdf2PasswordEncoder encoder = new Pbkdf2PasswordEncoder();

    public User loginUser(User user) throws UserNotFoundException {

        //user should be somehow associated with session
        User found = userRepository
                        .findByUsername(user.getUsername())
                        .orElseThrow(() ->new UserNotFoundException(
                                "User with this login does not exists: " + user.getUsername()));

        if (encoder.matches(user.getPassword(), found.getPassword())) {
            //we don't want to return password to UI.
            found.setPassword(null);
            return found;
        } else {
            return null;
        }
    }

    public User signUp(@Valid User user) throws UserLoginAlreadyExistsException {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UserLoginAlreadyExistsException("User with this login already exists: " + user.getUsername());
        }

        user.setRoles(new HashSet<>());
        user.getRoles().add(roleRepository.findByName("USER").orElse(null));
        if (user.getUsername().equalsIgnoreCase("admin")) {
            user.getRoles().add(roleRepository.findByName("ADMIN").orElse(null));
        }

        user.setPassword(encoder.encode(user.getPassword()));

        User saved = userRepository.save(user);
        return saved;
    }

    public void logoff() {
        //user should be somehow de-associated with session
        System.out.println("user logged off");
    }

}
