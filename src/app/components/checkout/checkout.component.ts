import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../core/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly _FormBuilder= inject(FormBuilder)
  private readonly _ActivatedRoute= inject(ActivatedRoute)
  private readonly _CheckoutService= inject(CheckoutService)
  cartID!:string | null

  shippingAddress:FormGroup = this._FormBuilder.group({
    details:[null],
    phone:[null],
    city:[null]
  })

  resSession!:any

  pay():void{
    console.log(this.shippingAddress.value);
    this._CheckoutService.checkoutSession(this.cartID , this.shippingAddress.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.resSession = res
        console.log(this.resSession.session.url)
        window.open(this.resSession.session.url, '_self')




      },
      error:(err)=>{
        console.log(err)


      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartID = param.get('cart_id')
        

      }
    })
  }

}
