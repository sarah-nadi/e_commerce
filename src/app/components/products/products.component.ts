import { Iproducts } from './../../core/interfaces/iproducts';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { SearchpipePipe } from '../../core/pipes/searchpipe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchpipePipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)

  products!:Subscription
  productsarr!:Iproducts[]
  isAdded :boolean = false
  searchValue : string = ''

  


  addItem(p_id:string){
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{console.log(res)
        this._CartService.cartCount.next(res.numOfCartItems)
        console.log(this._CartService.cartCount)
        this._ToastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}
    })
  }
  
  addItemToWishlist(p_id:string){
    this._WishlistService.addProductTowishlist(p_id).subscribe({
      next:(res)=>{console.log(res)
        

        this._ToastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}
    })
  }

    

  ngOnInit(): void {
    this.products = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data.slice(0,40))
        this.productsarr = res.data.slice(0,40)
        
        

      },
      error:(err)=>{
        console.log(err)
      }
    
  }



    )}}
