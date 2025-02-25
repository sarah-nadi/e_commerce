import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForgetPassComponent } from '../forget-pass/forget-pass.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass , ReactiveFormsModule  , RouterLink , RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  
    loading:boolean=false
    resText! :string
    loginSub!:Subscription
    loginInterval!:any

    constructor( private _FormBuilder: FormBuilder , private _AuthService:AuthService ,private _Router:Router){}
  
    loginForm: FormGroup = new FormGroup({
      email : new FormControl(null , [Validators.required , Validators.email]),
      password : new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  
  
    })

    
  
  
  
 /* loginForm : FormGroup = this._FormBuilder.group({
    email : [null , [Validators.required , Validators.email] ],
    password : [null , [ [Validators.required , Validators.pattern(/^\w{6,}$/)]]]

  })*/
    

    forgetPass():void{
      this._Router.navigate(['/forget'])
    }
  
  
   loginUser():void{
    if(this.loginForm.valid){
      this.loading = true
      console.log(this.loginForm),
      this.loginSub=this._AuthService.loginUser(this.loginForm.value).subscribe({
        next :(res) => {
          console.log(res)
          this.resText = res.message
          this.loading = false
          sessionStorage.setItem('token' , res.token)
          this.loginInterval=setTimeout(() => {
            this._Router.navigate(['/main/home'])
          }, 2000);
          
        },
        error:(err)=>{
          console.log(err)
          this.resText = err.error.message;
          this.loading = false
          
        }
      })
      
  
    }
    else{
      this.loginForm.markAllAsTouched()
    }
   }

   ngOnDestroy(): void {
    this.loginSub?.unsubscribe()
    clearInterval(this.loginInterval)
     
   }
    

}
