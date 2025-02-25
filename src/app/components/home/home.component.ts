import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { SearchpipePipe } from '../../core/pipes/searchpipe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink , SearchpipePipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy{
  private readonly _ProductsService =inject(ProductsService)
  private readonly _CategoriesService =inject(CategoriesService)
  private readonly _CartService =inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)
  productData!:Iproducts[]
  categoriesData!:Icategory[]
  
  productSub!:Subscription
  catSub!:Subscription
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
        console.log(this._CartService.cartCount)
        this._ToastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}
    })
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this.productSub = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data.slice(0,20))
        this.productData = res.data.slice(0,20)
        
        

      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.catSub=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesData = res.data
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe()
    this.catSub?.unsubscribe()
    

  }

}
