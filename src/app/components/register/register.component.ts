import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators ,} from '@angular/forms';
import { log } from 'console';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {


  constructor(private _AuthService:AuthService ,private _Router:Router){}


  loading:boolean=false
  resText!:string 
  registerSub!:Subscription
  regInterval!:any

  registerForm: FormGroup = new FormGroup({
    name :  new FormControl(null,[Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
    email : new FormControl(null , [Validators.required , Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword : new FormControl(null ,[Validators.required]),
    phone :new FormControl(null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),


  } ,this.confirmPassword)




  confirmPassword(g : AbstractControl){
    if(g .get('password')?.value === g.get('rePassword')?.value){
      return null;
    }else{
      return {missMatch : true}
    }

  }


 registerUser():void{
  if(this.registerForm.valid){
    this.loading = true
    console.log(this.registerForm.value)
    this.registerSub=this._AuthService.registerUser(this.registerForm.value).subscribe({
      next:(res)=> {console.log(res)
        this.resText=res.message
        this.loading =false
        this.regInterval=setInterval(() => {
          this._Router.navigate(['/auth/login'])
        },2000)
      },
      error:(error)=> {
        console.log(error.error.message)
        this.resText=error.error.message
         
          
        

      },
      complete:()=> {},
    })

  }
  


  else{
    this.registerForm.markAllAsTouched(),
    this.registerForm.setErrors({'missMatch':true})
  }
 }
  

 ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
  clearInterval(this.regInterval)
   
 }
}
