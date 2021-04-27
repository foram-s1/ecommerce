import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';
  constructor( private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.showSuccess();
  }
  showSuccess() {
    this.toastr.success('Added to cart','',{extendedTimeOut:5000});
  }

}
