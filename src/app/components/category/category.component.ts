import { Icategory } from './../../core/interfaces/icategory';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  private readonly _CategoriesService = inject(CategoriesService)
  cats!:Icategory[]
  catArr!:Subscription



  ngOnInit(): void {
    this.catArr = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.cats = res.data
        console.log(this.cats)

      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }



}
