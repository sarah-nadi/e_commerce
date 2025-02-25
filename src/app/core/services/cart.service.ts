import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  clientToken:any = {token : sessionStorage.getItem('token')}
  private readonly _HttpClient = inject(HttpClient)
  cartCount:BehaviorSubject<number> = new BehaviorSubject(0)
  carItems:BehaviorSubject<any> = new BehaviorSubject(0)

  constructor() { }



  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, {headers : this.clientToken })
  }

  addItemToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` , {"productId" : p_id} ,{headers : this.clientToken } )
  }


  deleteItemFromCart(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`, {headers : this.clientToken })

  }


  updateQuantity(p_id:string , count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}` , {"count" : count}, {headers : this.clientToken })
  }


  deleteCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart` , {headers : this.clientToken })

  }



  
}
