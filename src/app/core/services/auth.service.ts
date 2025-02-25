import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }
  decodedInfo:any

  registerUser(userData:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' ,userData)
  }


  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' ,userData)
  }

  saveDecodedUser():void{
    if(sessionStorage.getItem('token')){
     this.decodedInfo = jwtDecode(sessionStorage.getItem('token') !)
    }
  }
}
