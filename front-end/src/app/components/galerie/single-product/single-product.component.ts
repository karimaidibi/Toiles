import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product!: Product

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router :  Router) { }

  ngOnInit(): void {
    //scroll sur le haut
    // window.scroll(0,0)
    // récuperer l'id depuis la route
    this.route.params.subscribe({
      next: (params : Params)=>{
        const id = params['id'];
        this.productService.getProductById(id)
        .then((product : any)=>{
          this.product = product
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


}
