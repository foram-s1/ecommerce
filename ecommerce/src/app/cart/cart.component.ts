import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';


interface Cart{
  _id:number,
  name:string,
  price:number,
  quantity:number,
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[] = []


  constructor(private request: RequestService) { }
  count=0;
  total = 0;
  
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart=[]
    this.request.getCart().subscribe((data: any) => {
      if(data.err){
        console.log("Error")
      } else {
        this.cart = data.docs as Cart[]
        this.total = data.total
      }
    })
  }
}
