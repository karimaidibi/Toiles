import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DeleteProductModalComponent } from './components/partials/modal/delete-product-modal/delete-product-modal.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ContactComponent } from './components/contact/contact.component';
import { RdvComponent } from './components/contact/rdv/rdv.component';
import { ListRdvComponent } from './components/list-rdv/list-rdv.component';
import { FavorisComponent } from './components/galerie/favoris/favoris.component';
import { MonCompteComponent } from './components/user/mon-compte/mon-compte.component';
import { CommandeComponent } from './components/user/commande/commande.component';
import { SingleCommandeComponent } from './components/user/commande/single-commande/single-commande.component';

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
    DeleteProductModalComponent,
    ArtistComponent,
    ContactComponent,
    RdvComponent,
    ListRdvComponent,
    FavorisComponent,
    MonCompteComponent,
    CommandeComponent,
    SingleCommandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    // interceptor, sa classe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
