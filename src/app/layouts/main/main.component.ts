import { Component } from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { ProductsComponent } from "../../components/products/products.component";
import { CategoryComponent } from "../../components/category/category.component";
import { BrandsComponent } from "../../components/brands/brands.component";
import { CartComponent } from '../../components/cart/cart.component';
import { HomeComponent } from '../../components/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavMainComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
