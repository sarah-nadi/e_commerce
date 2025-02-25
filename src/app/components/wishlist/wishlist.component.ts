import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwish } from '../../core/interfaces/iwish';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  wishlistItems!:Iwish[]
  getwishSub!:Subscription

  ngOnInit(): void {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.wishlistItems = res.data
      },
      error:(err)=>{
        console.log(err)
      }


    })
  }

  addItem(p_id:string){
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{console.log(res)
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}
    })
  }

  deleteItem(p_id:string):void{
   this.getwishSub = this._WishlistService.deleteProductFromWishlist(p_id).subscribe({
      next:(res)=>{console.log(res.data)
        console.log(this.wishlistItems)
        this._ToastrService.success(res.message , 'Done')

        
        
      },
      error:(err)=>{console.log(err)}
    })

  }

}
