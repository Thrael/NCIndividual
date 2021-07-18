import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../User';
import { UserService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-indicator',
  templateUrl: './user-indicator.component.html',
  styleUrls: ['./user-indicator.component.css']
})
export class UserIndicatorComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public getCurrentUser(): User | undefined {
    return this.userService.getCurrentUser();
  }

  public openPopap(content: any) {
    const modalRef = this.modalService.open(content);
  }

  public logOff() {
    this.userService.logOff();
  }
}
