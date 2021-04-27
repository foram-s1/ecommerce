import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

interface Product{
    _id:number,
    name:string,
    price:number,
    quantity:number,
    detail:string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products=[]
    this.request.getProducts().subscribe((data: any) => {
      if(data.err){
        console.log("Error")
      } else {
        this.products = data.docs as Product[]
      }
    })
  }
}
