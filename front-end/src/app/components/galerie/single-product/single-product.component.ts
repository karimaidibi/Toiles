import { FavorisService } from './../../../services/favoris.service';

import { ArtistService } from './../../../services/artist.service';
import { Artist } from './../../../models/artist';
import { AuthService } from './../../../services/auth.service';
import { CartService } from './../../../services/cart.service';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product!: Product
  isAuth!: boolean
  userId!: any

  //admin
  adminMessage!: string
  isAdmin: boolean = false
  private adminId = environment.ADMIN_ID

  //Info artiste
  artist!: Artist
  errorArtisteMessage!: string

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router :  Router,
    private cartService: CartService,
    private authService: AuthService,
    private artistService: ArtistService,
    private favorisService: FavorisService) { }

  ngOnInit(): void {
    // verify sign in then do the rest
    this.verifSignIn()
    //scroll sur le haut
    // window.scroll(0,0)
    this.initProductSubscription()

  }

  initProductSubscription() : void{
    // récuperer l'id depuis la route
    this.route.params.subscribe({
      next: (params : Params)=>{
        const id = params['id'];
        this.productService.getProductById(id)
        .then((product : any)=>{
          this.product = product
          this.getArtistById(product.artistId)
        })
        .catch((err)=>{
          this.router.navigate(['/not-found'])
          console.log(err.message)
        })
      },
      error: (err)=>{
        this.router.navigate(['/not-found'])
        console.log(err)
      },
      complete : ()=>{
        console.log("complete")
      }
    })
  }

  getArtistById(id: any){
    this.artistService.getArtistById(id)
    .then((artist: any)=>{
      this.artist = artist
    })
    .catch((err)=>{
      this.errorArtisteMessage = "l'artiste de cet objet artistique n'est pas renseigné :-) "
      console.log(err.message)
    })
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
    }else{
      this.router.navigate(['/signup'])
    }
  }

  addToFavoris(productId : string, product : Product){
    if(this.isAuth  && !this.isAdmin){
      this.favorisService.addToFavoris(productId, this.userId, product)
    }else if(!this.isAdmin){
      this.router.navigate(['/signup'])
    }else{
      this.adminMessage = "Créer un compte normal afin de pouvoir accéder à cette fonctionnalité :-) Merci !"
      //scroll sur le haut
      window.scroll(0,0)
    }
  }

}
