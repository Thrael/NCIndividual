import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.css']
})
export class CatalogMenuComponent implements OnInit {

  public data = [
    {
      name:"item1",
      children: [
        {
          name: "child1",
          children: [
            {
              name:"child of child",
              children:[]
            }
          ]
        },
        {
          name: "with children",
          children: [
            {
              name:"child of child",
              children:[]
            }
          ]
        }
      ]
    },
    {
      name:"item2",
      children: [
        {
          name: "child1",
          children: [
            {
              name:"child of child",
              children:[]
            }
          ]

        },
        {
          name: "with children",
          children: [
            {
              name:"child of child",
              children:[]
            }
          ]
        }
      ]
    }

  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }  

  public navigate(type: string): void {
    this.router.navigate(['/catalog'], { queryParams: { type: type }});
  }
}
