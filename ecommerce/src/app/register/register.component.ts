import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.showSuccess()
  }

  showSuccess() {
    this.toastr.error('Must be 8 character', '');
  }
}
