import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  clientToken:any = {token : sessionStorage.getItem('token')}


  constructor(private _HttpClient:HttpClient) { }
    getLoggedUserWishlist():Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist` , {headers : this.clientToken })
    }
    
    addProductTowishlist(p_id:string):Observable<any>{
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist` , {"productId" : p_id} ,{headers : this.clientToken } )
    }


    deleteProductFromWishlist(p_id:string):Observable<any>{
      return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}`, {headers : this.clientToken })
  
    }
  
}
