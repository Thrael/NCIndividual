import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-adduser-form',
  templateUrl: './adduser-form.component.html',
  styleUrls: ['./adduser-form.component.css']
})
export class AdduserFormComponent implements OnInit {

  adduserForm = new FormGroup({
    name: new FormControl(),
    login: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl()
  });

  private error: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal) { };

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.adduserForm.value);
    let user = new User(this.adduserForm.value.login,
                      this.adduserForm.value.password,
                      this.adduserForm.value.name,
                      this.adduserForm.value.email,
                      this.adduserForm.value.phoneNumber);

    let subject: Subject<User> = this.userService.saveUser(user);
    
    subject.subscribe(
      res => {
        this.error = "";
        this.modalService.dismissAll();
        this.router.navigate(['']);
      },
      err => this.error = "Please try again."
    )
  }

}
