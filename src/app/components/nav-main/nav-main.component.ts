import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit , OnDestroy{
  constructor(private  _Router:Router){}
  private readonly _CartService = inject(CartService);
  subID! : Subscription
  pnum:number = 0
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this._CartService.cartCount.next(res.numOfCartItems)

        this.subID = res.numOfCartItems

      }

    })
    this.subID = this._CartService.cartCount.subscribe({
      next:(value)=>{
        console.log(value)
        this.pnum = value

      }
    })
    
  }

  logOut():void{
    sessionStorage.removeItem('token')
    this._Router.navigate(['/auth/login'])

  }
  ngOnDestroy(): void {
    this.subID.unsubscribe()
  }

}
