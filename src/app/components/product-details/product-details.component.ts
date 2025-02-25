import { Iproducts } from './../../core/interfaces/iproducts';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService){}
  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay:true,
      autoplayTimeout:1000,
      navSpeed: 700,
      
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
      nav: false
    }

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productId!:string | null
  productDetails:Iproducts = {} as Iproducts

  addProductToCart(p_id:string){
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{console.log(res)
        this._ToastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}

    })

  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      {
        next:(pInfo)=>{
          console.log(pInfo.get('p_id'))
          this.productId = pInfo.get('p_id')

        }
      }
    )

    this._ProductsService.getProductsDetails(this.productId).subscribe({
      next:(res)=>{
        
        this.productDetails = res.data
      console.log(this.productDetails)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
