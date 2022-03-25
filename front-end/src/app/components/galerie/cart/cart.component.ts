import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Product } from './../../../models/product';
import { CartService } from './../../../services/cart.service';
import { Item } from './../../../models/item';
import { Cart } from './../../../models/cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart!: Cart
  items!: any
  isAuth!: boolean
  resume!: {
    quantity: number,
    costHT: number,
    costTaxe: number,
    costTTC: number
  };
  userId: string = ''
  errorMessage!: string
  successMessage!: string
  loading: boolean = false

  private adminId = environment.ADMIN_ID
  isAdmin: boolean = false
  adminMessage!: string

  constructor(private cartService: CartService,
    private authService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe({
      next : (cart: Cart)=>{
        this.cart = cart
        this.items = cart.items
        this.resume = cart.resume
      },
      error: (err)=>{
        console.log(err)
      }
    })
    this.cartService.emitCart()
    this.verifSignIn()
  }

  //assigner is auth a true si user est connecté
  verifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        if(this.isAuth && this.authService.userId){
          this.userId = this.authService.userId
          this.cart.userId = this.userId
          if(this.adminId === this.userId){
            this.isAdmin = true
          }
        }
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

  removeCart(){
    if(this.isAuth){
      this.cartService.removeCart()
    }else{
      this.router.navigate(['/signup'])
    }
  }

  placeOrder(cart : Cart){
    this.loading = true
    if(this.isAuth && this.userId && !this.isAdmin){
      this.cartService.placeOrder(cart)
      .then(()=>{
        this.successMessage = "Merci d'avoir commandé chez nous. A bientot !"
        this.loading = false
        this.removeCart()
      })
      .catch((err)=>{
        this.loading = false
        this.errorMessage = err.message
        console.log(err.message)
      })
    }
    if(this.isAdmin){
      this.adminMessage = "Créer un compte normal afin de pouvoir commander, merci !"
      //scroll sur le haut
      window.scroll(0,0)
    }
  }

  ngOnDestroy(): void {
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('cart','')
    }
  }

}
