import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {   }

  getProducts(){
    return this.http.get('/api/product',{})
  }

  getCart(){
    return this.http.get('/api/cart',{})
  }
  getOrder(){
    return this.http.get('/api/order',{})
  }
  
  getOrderItem(){
    return this.http.get('/api/order-item',{})
  }
  
  getTransaction(){
    return this.http.get('/api/transact',{})
  }
  
  getDetails(){
    return this.http.get('/api/details',{})
  }

}
