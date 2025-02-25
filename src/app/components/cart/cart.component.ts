import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy{

 
  constructor(private _CartService:CartService){}
  cartData! : Icart 
  getCartSub!:Subscription

  deleteItem(p_id:string):void{
    this._CartService.deleteItemFromCart(p_id).subscribe({
      next:(res)=>{console.log(res)
        this._CartService.cartCount.next(res.numOfCartItems)
        this.cartData = res.data
        
      },
      error:(err)=>{console.log(err)}
    })

  }

  deleteCart():void{
    this._CartService.deleteCart().subscribe({
      next:(res)=>{
        console.log(res)
        

        this.cartData = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  updateProductQuantity(p_id:string , count:number):void{
    this._CartService.updateQuantity(p_id , count).subscribe({
      next:(res)=>{console.log(res)
        this.cartData = res.data
      },
      error:(err)=>{console.log(err)}
    })
  }

  ngOnInit(): void {
   this.getCartSub = this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{console.log(res.data),
        this.cartData = res.data
      },
      error:(err)=>{console.log(err)},
    })
  }
  ngOnDestroy(): void {
    this.getCartSub.unsubscribe()
    
  }
}
