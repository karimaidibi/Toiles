import { FavorisService } from './../../services/favoris.service';
import { CartService } from './../../services/cart.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit, OnDestroy {

  productSub!: Subscription
  products!: Product[]
  userId!: any
  loading: boolean = true

  private adminId = environment.ADMIN_ID
  isAdmin: boolean = false
  isAuth!: boolean
  adminMessage!: string

  constructor(private productService: ProductService,
    private router : Router,
    private authService: AuthService,
    private cartService: CartService,
    private favorisService: FavorisService
              ) { }

  ngOnInit(): void {
    // verify signin
    this.verifSignIn()

    //get products
    this.productSub = this.productService.products$.subscribe({
      next:(products : any)=>{
        this.loading = false
        this.products = products
      },
      error: (err)=>{
        this.loading = true
        console.log(err)
      },
      complete :()=>{
      }
    });

    this.productService.getProducts()
  }

  //assigner is auth a true si user est connecté
  verifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        if(bool){
          // get user id
          this.userId = this.authService.userId
          if(this.userId === this.adminId){
            this.isAdmin = true
          }
        }
      }
    )
  }

  addToCart(product: Product){
    if(this.isAuth){
      this.cartService.addToCart(product)
    }else {
      this.router.navigate(['/signup'])
    }
  }

  addToFavoris(productId : string, product : Product){
    if(this.isAuth  && !this.isAdmin){
      this.favorisService.addToFavoris(productId, this.userId, product)
    }else if(!this.isAdmin){
      this.router.navigate(['/signup'])
    }else{
      this.adminMessage = "Créer un compte normal afin de pouvoir accéder à cette fonctionnalité :-), merci !"
      //scroll sur le haut
      window.scroll(0,0)
    }
  }

  ngOnDestroy(): void {
      this.productSub.unsubscribe()

  }

}
