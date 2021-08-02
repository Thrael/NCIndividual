import { Subject } from 'rxjs';
import { Category } from './../entity/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventBusService } from '../eventsourcing/eventbus.service';
import { BusEvent } from '../eventsourcing/bus-event';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private getAllCategoriesUrl: string = 'https://localhost:8443/rest/v1/category';

  public categories: Category[] = [];

  constructor(
    private http: HttpClient, 
    private eventService: EventBusService) {}

  public getAllCategories(): void {
    if(this.categories?.length == 0) {
      this.http.get<Category[]>(this.getAllCategoriesUrl)
        .subscribe(
          res => this.categories = res,
          err => console.log(err)
        );
    }
  }
}
