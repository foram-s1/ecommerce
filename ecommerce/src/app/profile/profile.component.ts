import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: any;
  edit: boolean = false;
  newdetails={
    name:"",
    phone:0,
    address:""
  };

  constructor(private request:RequestService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadDetails();
  }

    loadDetails(): void{
      this.request.getDetails().subscribe((data: any) => {
      if(data.err){
        console.log("Error")
      } else {
        this.details = data.details[0];
        this.newdetails = {name: this.details.name, phone: this.details.phone, address: this.details.address}
      }
    })
    }

    updDetails(name: string, cont: number, address: string):void{
      this.request.updDetails(name, cont, address).subscribe((data: any) => {
        if(data.err){
          console.log(data.err.sqlMessage)
        } else if(data.docs=="0") {
          this.toastr.error("Phone number is not valid");
        } else{
          this.toastr.success(data.docs);
          this.loadDetails();
        }
      })
      this.edit = false;
    }

    editing(): void{
      this.edit=true;
    }
}
