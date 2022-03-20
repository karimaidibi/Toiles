import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { SingleProductComponent } from './components/galerie/single-product/single-product.component';
import { EditProductComponent } from './components/galerie/edit-product/edit-product.component';
import { CartComponent } from './components/galerie/cart/cart.component';
import { AddProductComponent } from './components/galerie/add-product/add-product.component';
import { GalerieComponent } from './components/galerie/galerie.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'signup', component: SignupComponent},
  {path:'signin', component: SigninComponent},
  {path:'galerie', component: GalerieComponent},
  {path:'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path:'cart/:id', component: CartComponent},
  {path:'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path:'single-product/:id', component: SingleProductComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'', component: HomeComponent},
  // si tout ce qui es tavant ne marche pas faire ceci
  {path:'**', pathMatch:'full', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
