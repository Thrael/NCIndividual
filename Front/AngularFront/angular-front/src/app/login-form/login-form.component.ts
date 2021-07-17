import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  });

  constructor(private userService: UserService, private router: Router) { };

  ngOnInit(): void {
  };

  onSubmit(): void {
    console.log(this.loginForm.value);
    let user = new User(this.loginForm.value.login, this.loginForm.value.password);
    let logged = this.userService.loginUser(user);
    let response;
    // console.log(logged.subscribe(logged => {
    //   response = logged;
    // }))
    console.log(logged);
    console.log(response);
    this.router.navigate(['']);
  }

}
