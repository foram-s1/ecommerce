import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { RequestService } from '../request.service';

interface Category{
  cat_id:number,
  name:string
}
interface Product{
    p_id:number,
    name:string,
    price:number,
    quantity:number,
    detail:string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  products: Product[] = []

  category: Category[] = []

  value: string = "";
  id: number = 1;
  constructor(private request: RequestService, private toastr: ToastrService ,public auth: AuthenticationService ) { }

  ngOnInit(): void {
    this.loadProducts(1);
  }

  loadProducts(id: number): void {
    this.products=[]
    this.request.getProducts('', id).subscribe((data: any) => {
      if(data.err){
        console.log(data.err)
      } else {
        this.products = data.docs[0] as Product[];
        this.category = data.docs[2] as Category[];
      }
    })
  }

  search(){
    if(this.value){
      this.request.getProducts(this.value, 1).subscribe((data: any)=> {
        if (data.err) {
          console.log(data.err)
        } else {
          this.products = data.docs[0] as Product[]
        }
      })
    } else {
      this.loadProducts(1);
    }
  }



  addToCart(quantity:number, p_id: number): void {
    this.request.updCart(quantity, p_id ).subscribe((data: any)=>{
      if(data.err){
        this.toastr.error("Already added to cart")
      } else{
        this.toastr.success("Added Successfully")
      }
    })
  }

}
