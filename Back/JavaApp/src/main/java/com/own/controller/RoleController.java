package com.own.controller;

import com.own.entity.Position;
import com.own.entity.Role;
import com.own.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/roles")
    public List<Role> retrieveAllRoles() {
        return roleRepository.findAll();
    }

    @PostMapping(value = "/roles", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public void addRole(@RequestBody Role role) {
        roleRepository.save(role);
    }

}
