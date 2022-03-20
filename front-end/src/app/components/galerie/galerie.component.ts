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
  isAdmin!: boolean

  constructor(private productService: ProductService,
    private router : Router,
    private authService: AuthService
              ) { }

  ngOnInit(): void {
    // get user id
    this.userId = this.authService.userId
    if(this.userId === this.adminId){
      this.isAdmin = true
    }
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


  ngOnDestroy(): void {
      this.productSub.unsubscribe()
  }

}
