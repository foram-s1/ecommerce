import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, Customer, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent{

  user: TokenPayload ={
    c_id: 0,
    email: '',
    password:'',
    name: '',
  }

  constructor( private auth:AuthenticationService, private router: Router, private toastr: ToastrService) { }

  login(){
    this.auth.login(this.user).subscribe(
      ()=>{
        this.router.navigateByUrl('')
      }
    )
  }

  register(){
      
  }

}
