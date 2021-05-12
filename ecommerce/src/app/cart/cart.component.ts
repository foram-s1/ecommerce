import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../request.service';


interface Cart{
  _id:number,
  name:string,
  price:number,
  quantity:number,
  p_id:number,
  p_q:number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[] = []


  constructor(private request: RequestService, private toastr: ToastrService) { }
  quantity=0;
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

  addToCart(quantity:number, p_id: number): void {
    this.request.updCart(quantity, p_id ).subscribe((data: any)=>{
      if(data.err){
        this.toastr.error(data.err.sqlMessage)
      } else{
        this.loadCart();
      }
    })
  }

  deleteCart( p_id:number) :void {
    this.request.updCart(0, p_id ).subscribe((data: any)=>{
      if(data.err){
        this.toastr.error(data.err.sqlMessage)
      } else{
        this.loadCart();
      }
    })
  }

  placeOrder():void {
    this.request.placeOrder().subscribe((data: any) => {
      if(data.err){
        this.toastr.error(data.err.sqlMessage)
      } else{
        this.toastr.success(data.docs[0][0].coinmsg);
        this.toastr.success(data.docs[1][0].message);
        this.loadCart();
      }
    })
  }
  
}
