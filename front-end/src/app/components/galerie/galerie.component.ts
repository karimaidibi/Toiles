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

  constructor(private productService: ProductService
              ) { }

  ngOnInit(): void {
    this.productSub = this.productService.products$.subscribe({
      next:(products : any)=>{
        this.products = products
      },
      error: (err)=>{
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
