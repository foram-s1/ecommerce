import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import * as moment from 'moment';
import { element } from 'protractor';


interface Order{
  _id:number,
  order_date: string,
  delivery_date: string,
  status: string,
  tot_amount: number
}

interface Item{
  _id:number,
  name:string,
  price:number,
  quantity:number,
  tot: number
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = []
  items: Item[] = []

  constructor( private request: RequestService) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.orders=[]
    this.request.getOrder().subscribe((data: any) => {
      if(data.err){
        console.log("Error")
      } else {
        this.orders = data.order.map((element: any)=>{
          return { ...element, order_date: moment(element.order_date).format("DD-MM-YYYY"), delivery_date: moment(element.delivery_date).format("DD-MM-YYYY")};
        })
      }
    })
  }

  loadItem():void {
    this.items=[]
    this.request.getOrderItem().subscribe((data: any) => {
      if(data.err){
        console.log("Error")
      } else {
        this.items = data.order_item as Item[];
      }
    })
  }
}
