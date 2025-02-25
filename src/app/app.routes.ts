import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { authguardGuard } from './core/guards/authguard.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';

export const routes: Routes = [
    {path:'main' , component:MainComponent, canActivate:[authguardGuard]  , children:[
        {path:'' , redirectTo:'home' , pathMatch:'full'},
        {path:'home' , component:HomeComponent , title:'Home'},
        {path:'products' , component:ProductsComponent, title:'Products'},
        {path:'brands' , component:BrandsComponent, title:'Brands'},
        {path:'cart' , component:CartComponent, title:'Cart'},
        {path:'category' , component:CategoryComponent, title:'Category'},
        {path:'wishlist' , component:WishlistComponent, title:'wishList'},
        {path:'productDetails/:p_id' , component:ProductDetailsComponent, title:'details'},
        {path:'checkout/:cart_id' , component:CheckoutComponent, title:'check-out'},
    ]},
    {path:'forget' , component:ForgetPassComponent , title:'forgetPassword' },


    {path:'auth' , component:AuthComponent, children:[
        {path:'' , redirectTo:'login' , pathMatch:'full'},



        {path:'login' , component:LoginComponent , title:'Login'},
        {path:'register' , component:RegisterComponent , title:'Register' },
    ]},
    
    {path:'' , redirectTo:'auth' , pathMatch:'full'},

    {path:'**' , component:NotFoundComponent},

    
];
