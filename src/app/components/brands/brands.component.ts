import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/brands.service';
import { Subscription } from 'rxjs';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService)
  getBrands!:Subscription
  brands!:Ibrands[]
  


  ngOnInit(): void {
    this.getBrands = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.brands= res.data
      },
      error:(err)=>{
        console.log(err)
      }

    })
    
  }




}
