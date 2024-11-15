import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { GiftCardsComponent } from './gift-cards/gift-cards.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './auth.guard';
import { ShoppingComponent } from './shopping/shopping.component';
import { OffersComponent } from './offers/offers.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotfoundComponent } from './notfound/notfound.component';
export const routes: Routes = [
    
    {path:"" , redirectTo:"home", pathMatch:"full"},
    {path:"home" , component:HomeComponent},
    {path:"about" , component:AboutComponent},
    {path:"bestsellers" , component:BestSellersComponent},
    {path:"brands" , component:BrandsComponent},
    {path:"cart" ,canActivate:[authGuard] ,component:CartComponent},
    {path:"giftcards" , component:GiftCardsComponent},
    {path:"signin" , component:SignInComponent},
    {path:"signup" , component:SignUpComponent},
    {path:"shopping", component:ShoppingComponent},
    {path:"offers", component:OffersComponent},
    {path:"productDetails/:id"   ,canActivate:[authGuard], component:ProductDetailsComponent},
    {path:"**" , component:NotfoundComponent},

];

