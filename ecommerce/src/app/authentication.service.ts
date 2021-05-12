import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'


export interface Customer{
  c_id: number
  name: string
  email:string
  password: string
  phone: bigint
  address: string
  exp: number
  iat:number
}

export interface TokenPayload{
  c_id: number
  name: string
  email: string
  password: string
}

@Injectable()

export class AuthenticationService implements CanActivate{
  public token: any;

  constructor( private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  canActivate() {
    if (!this.isLogInUser()){
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }

  public saveToken( token: string): void {
    localStorage.setItem('usertoken', token )
    this.token = token
  }

  public getToken(): string {
    if( !this.token ){
      this.token = localStorage.getItem('usertoken') as string;
    }
    return this.token;
  }

  public getCustomer(): Customer {
    const token = this.getToken()
    let payload
    if ( token ) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null as any;
    }
  }

  public isLogInUser(): boolean {
    const user = this.getCustomer()
    if ( user ) {
      return user.exp > Date.now() / 1000
    }
    return false;
  }

  public login(user: TokenPayload): Observable<any>{
    const base = this.http.post('/api/login', user )
    const request = base.pipe( map((data: any) => {
      if(data.token) {
        this.toastr.success('Welcome, ' +user.name)
        this.saveToken( data.token)
      } else {
        this.toastr.error(data.error);
      }
       return data
    })
    )
    return request
  }

  public register(newuser: Customer){
    return this.http.post('/api/register', newuser, {
      headers:{
        Authorization: `${this.getToken()}`
      }
    })
  }

  public logout(): void {
    this.toastr.success('Thank you for visiting!!')
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('')
  }

}
