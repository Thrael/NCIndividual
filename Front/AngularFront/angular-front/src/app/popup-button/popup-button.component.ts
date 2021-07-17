import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './../login-form/login-form.component';

@Component({
  selector: 'app-popup-button',
  templateUrl: './popup-button.component.html',
  styleUrls: ['./popup-button.component.css']
})
export class PopupButtonComponent implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  open(content: any) {
    const modalRef = this.modalService.open(content);
  }
}


//https://ng-bootstrap.github.io/#/components/modal/examples
//https://angular.io/guide/dynamic-component-loader
//https://stackblitz.com/angular/mkajnaabomx?file=src%2Fapp%2Fhero-job-ad.component.ts