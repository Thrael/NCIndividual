import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Position } from '../Position'
import { PositionService } from '../position-service.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  positions: Position[];
  type: string | null = null;

  constructor(private positionService: PositionService,
             private route: ActivatedRoute) {
    this.positions = [
      {
        id: 1,
        name: "prod1",
        price: 1,
        description: "desc"
      },
      {
        id: 2,
        name: "prod12",
        price: 1,
        description: "desc"
      },
      {
        id: 3,
        name: "prod33",
        price: 1,
        description: "desc"
      }
    ];
   }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe(params => {
        this.type = params.get("type")
        console.log(this.type + " : catalog.type")
      });
  }
  
  

}
