import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import * as moment from 'moment';


interface Transact{
  _id:number,
  o_id: number,
  date: string,
  status: string,
  amount: number
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transacts: Transact[] = []

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.loadTransact();
  }

    loadTransact():void{
      this.transacts=[]
    this.request.getTransaction().subscribe((data: any) => {
      if(data.err){
        console.log("Error")
      } else {
        this.transacts = data.transact.map((element: any)=>{
          return { ...element, date: moment(element.date).format("DD-MM-YYYY")};
        })
      }
    })
    }
}
