import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private auth: AuthenticationService) {   }

  getProducts(value: string, id: number){
    return this.http.post('/api/product',{search: value, cat_id: id})
  }

  getCart(){
    return this.http.get('/api/cart', {
      headers: {
        Authorization : `${this.auth.getToken()}`
      }
    })
  }

  updCart(quantity: number, p_id: number){
    return this.http.post('/api/updcart', { quantity: quantity, p_id: p_id}, {
      headers: {
        Authorization : `${this.auth.getToken()}`
      }
    })

  }

  placeOrder(){
    return this.http.get('/api/placeorder', {
      headers: {
        Authorization : `${this.auth.getToken()}`
      }
    })
  }

  getOrder(){
    return this.http.get('/api/order', {
      headers: {
        Authorization : `${this.auth.getToken()}`
      }
    })
  }
  
  getOrderItem(o_id: number){
    return this.http.post('/api/order-item', { o_id: o_id })
  }
  
  deleteOrder(o_id: number){
    return this.http.post('/api/delorder', { o_id: o_id }, {
      headers: {
        Authorization : `${this.auth.getToken()}`
      } 
    })
  }

  getTransaction(){
    return this.http.get('/api/transact',{
        headers: {
          Authorization : `${this.auth.getToken()}`
        }
    })
  }
  
  addCoins(amt: number){
    return this.http.post('/api/addcoins', { amt: amt }, {
        headers: {
          Authorization : `${this.auth.getToken()}`
        }
    })
  }
  
  getDetails(){
    return this.http.get('/api/details',{
      headers: {
        Authorization : `${this.auth.getToken()}`
      }
    })
  }

  updDetails(name: string, cont: number, address: string){
    return this.http.post('/api/update', { name: name, phone: cont, address: address }, {
      headers: {
        Authorization : `${this.auth.getToken()}`
      }
  })
  }

}
