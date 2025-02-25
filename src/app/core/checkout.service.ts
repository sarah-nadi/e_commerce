import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor( private _HttpClient:HttpClient) { }
  clientToken:any = {token : sessionStorage.getItem('token')}



  checkoutSession(cartID:string | null , formData:object){
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartID}?url=${environment.url}`,
      {"shippingAddress" : formData},
      {headers : this.clientToken}
    )
  }
}
