import { Router } from '@angular/router';
import { CartService } from './../../../services/cart.service';
import { AuthService } from './../../../services/auth.service';
import { Product } from './../../../models/product';
import { FavorisService } from './../../../services/favoris.service';
import { Favoris } from './../../../models/favoris';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit, OnDestroy {

  favorisModel!: Favoris
  products!: Product[]

  userId!: string | null
  isAuth!: boolean
  isAdmin: boolean = false
  private adminId = environment.ADMIN_ID

  constructor(
    private favorisService: FavorisService,
    private authService: AuthService,
    private cartService : CartService,
    private router : Router) { }

  ngOnInit(): void {
    this.verifSignIn()
    this.getFavoris()
    this.initFavoris()
  }

  //assigner is auth a true si user est connecté
  verifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        this.userId =  this.authService.userId
        if(this.adminId === this.userId){
          this.isAdmin = true
        }
      }
    )
  }

  initFavoris() : void{
    this.favorisService.favorisModel$.subscribe({
      next: (favorisModel : Favoris)=>{
        this.favorisModel = favorisModel
        this.products = favorisModel.products
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
    this.favorisService.emitFavoris()
  }

  removeOne(productId: string){
    this.favorisService.removeOne(productId)
  }

  getFavoris(){
    if(this.isAuth && !this.isAdmin){
      this.favorisService.getFavoris(this.userId)
    }
  }

  passerLaCommande(){
    this.favorisModel.products.forEach(product=>{
      this.cartService.addToCart(product)
    })
    this.router.navigate(['/cart'])
  }

  ngOnDestroy(): void {
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('favoris','')
    }
  }

}
