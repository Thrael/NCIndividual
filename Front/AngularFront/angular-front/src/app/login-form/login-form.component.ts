import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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

  public error: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal) { };

  ngOnInit(): void {
  };

  onSubmit(): void {
    console.log(this.loginForm.value);
    let subject: Subject<User> = this.userService.loginUser(this.loginForm.value.login, this.loginForm.value.password);
    subject.subscribe(
      (res) => {
        this.error = "";
        this.modalService.dismissAll();
        this.router.navigate(['']);
      },
      (err) => this.error = "Please try again."
    );
  }
}
