import { ProductService } from './../../../services/product.service';
import { GalerieComponent } from './../../galerie/galerie.component';
import { CartService } from './../../../services/cart.service';
import { Cart } from './../../../models/cart';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean
  private adminId = environment.ADMIN_ID
  isAdmin!: boolean
  userId!: any
  resume!: any


  constructor(private authService : AuthService,
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe({
      next: (cart: Cart)=>{
        this.resume = cart.resume
      },
      error : (err)=>{
        console.log(err)
      }
    })
    this.cartService.emitCart()

    this.VerifSignIn()
  }

  //assigner is auth a true si user est connecté
  VerifSignIn() : void{
    this.authService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
        this.userId = this.authService.userId
        if(this.userId === this.adminId){
          this.isAdmin = true
        }
      }
    )
  }

  filterOnTypeProduit(type_produit:string){
    this.productService.filterOnTypeProduit(type_produit)
  }

  logout(){
    this.authService.logout()
    window.location.reload();
  }

}
