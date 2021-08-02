import { Category } from './../entity/category';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.css']
})
export class CatalogMenuComponent implements OnInit {

  constructor(private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.categoryService.getAllCategories()
  }  

  public navigate(type: string): void {
    this.router.navigate(['/catalog'], { queryParams: { type: type }});
  }

  public getCategories(): Category[] {
    return this.categoryService.categories;
  }
}
