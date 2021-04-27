import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

interface Detail{
  _id:number,
  phone: number,
  email: string,
  name: string,
  coins: number,
  address: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: any;

  constructor(private request:RequestService) { }

  ngOnInit(): void {
    this.loadDetails();
  }

    loadDetails(): void{
      this.request.getDetails().subscribe((data: any) => {
      if(data.err){
        console.log("Error")
      } else {
        this.details = data.details[0];
      }
    })
    }
}
