import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


interface Order{
  o_id:number,
  order_date: string,
  delivery_date: string,
  status: string,
  tot_amount: number
}

interface Item{
  o_id:number,
  p_id:number,
  name:string,
  price:number,
  quantity:number,
  tot: number,
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = []
  items: Item[] = []
  tot_amt=0;

  constructor( private request: RequestService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadOrder();
    setInterval(() => {
      this.loadOrder();
    }, 100000)
  }

  

  loadOrder(): void {
    this.orders=[]
    this.request.getOrder().subscribe((data: any) => {
      if(data.err){
        this.toastr.error(data.err)
      } else {
        this.orders = data.order.map((element: any)=>{
          return { ...element, order_date: moment(element.order_date).format("DD-MM-YYYY"), delivery_date: moment(element.delivery_date).format("DD-MM-YYYY")};
        })
      }
    })
  }

  loadItem(o_id: number, tot_amt: number):void {
    this.items=[]
    this.request.getOrderItem( o_id ).subscribe((data: any) => {
      if(data.err){
        console.log(data.err)
      } else {
        this.items = data.docs as Item[];
        this.tot_amt=tot_amt;
      }
    })
  }
  
  deleteOrder( o_id: number): void {
    this.request.deleteOrder( o_id ).subscribe((data: any) => {
      if(data.err){
        this.toastr.error(data.err)
        console.log(data.err)
      } else {
        this.toastr.success("Order and transaction updated successfully!")
        this.loadOrder();
      }
  })
  }

}
