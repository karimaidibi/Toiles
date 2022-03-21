import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Product } from './../../../models/product';
import { CartService } from './../../../services/cart.service';
import { Item } from './../../../models/item';
import { Cart } from './../../../models/cart';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart!: Cart
  items!: any
  isAuth!: boolean

  constructor(private cartService: CartService,
    private authService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.verifSignIn()
    this.cartService.cart$.subscribe({
      next : (cart: Cart)=>{
        this.cart = cart
        this.items = cart.items
      },
      error: (err)=>{
        console.log(err)
      }
    })
    this.cartService.emitCart()
  }

  //assigner is auth a true si user est connecté
  verifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
      }
    )
  }

  addToCart(product: Product){
    if(this.isAuth){
      this.cartService.addToCart(product)
    }else{
      this.router.navigate(['/signup'])
    }
  }

  removeOne(product : Product){
    if(this.isAuth){
      this.cartService.removeOne(product)
    }else{
      this.router.navigate(['/signup'])
    }
  }

  removeMany(product: Product){
    if(this.isAuth){
      this.cartService.removeMany(product)
    }else{
      this.router.navigate(['/signup'])
    }
  }

  ngOnDestroy(): void {
      if(typeof localStorage !== "undefined"){
        localStorage.setItem('cart','')
      }
  }

}
