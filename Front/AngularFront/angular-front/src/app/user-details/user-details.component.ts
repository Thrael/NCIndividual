import { UserService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getCurrentUser(): User | undefined{
    return this.userService.getCurrentUser();
  }
}
