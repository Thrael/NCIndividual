package com.own.controller;

import com.own.entity.Privilege;
import com.own.entity.Role;
import com.own.repository.PrivilegeRepository;
import com.own.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class PrivilegeController {

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @GetMapping("/privileges")
    public List<Privilege> retrieveAllPrivileges() {
        return privilegeRepository.findAll();
    }

    @PostMapping(value = "/privileges", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public void addRole(@RequestBody Privilege privilege) {
        privilegeRepository.save(privilege);
    }

}
