import { Router } from '@angular/router';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor(private productService: ProductService,
    private router : Router
              ) { }

  ngOnInit(): void {
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
