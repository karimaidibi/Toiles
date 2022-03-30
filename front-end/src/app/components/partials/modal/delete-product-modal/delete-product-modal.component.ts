import { Router } from '@angular/router';
import { Product } from './../../../../models/product';
import { ProductService } from './../../../../services/product.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {

  @Input() product!: Product;
  userId : any
  private adminId = environment.ADMIN_ID

  constructor(private auth: AuthService,
    private productService : ProductService,
    private router : Router) { }

  ngOnInit(): void {
    this.userId = this.auth.userId
  }

  // fonction qui permet de supprimer un produit
  deleteProduct(product: Product){
    // couche de securité admin
    if(this.adminId !== this.userId){
      console.log("permission denied")
      this.router.navigate(['/not-found'])
      return;
    }
    this.productService.deleteProduct(this.product._id)
    .then(()=>{
      this.router.navigate(['/galerie'])
      window.location.reload();
      console.log('product deleted : ' + this.product._id)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }

}
