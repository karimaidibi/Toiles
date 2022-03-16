import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { GalerieComponent } from './components/galerie/galerie.component';
import { AddProductComponent } from './components/galerie/add-product/add-product.component';
import { CartComponent } from './components/galerie/cart/cart.component';
import { EditProductComponent } from './components/galerie/edit-product/edit-product.component';
import { SingleProductComponent } from './components/galerie/single-product/single-product.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HeaderPageComponent } from './components/partials/header-page/header-page.component';
import { ModalComponent } from './components/partials/modal/modal.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    GalerieComponent,
    AddProductComponent,
    CartComponent,
    EditProductComponent,
    SingleProductComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    HeaderPageComponent,
    ModalComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
