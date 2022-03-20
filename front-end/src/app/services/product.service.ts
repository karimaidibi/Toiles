import { Data } from './../models/data';
import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //URL de l'api stoqué comme variable d'environnement
  api = environment.api;
  // les produits
  products!: Product[];
  // observable
  products$ = new Subject<Product[]>()

  constructor(private http: HttpClient) { }

  emitProducts(){
    this.products$.next(this.products)
  }

  getProducts(){
    this.http.get(this.api+'/toiles').subscribe({
      next:(data : any)=>{
        if(data.status===200){
          this.products = data.result
          this.emitProducts()
        }else{
          console.log("Pas d'erreur mais GET Echec : ",data.message)
        }
      },
      error:(error)=>{
        console.log("error GET PRODUCTS : ",error)
      }

    })
  }

  getProductById(id: string){
    return new Promise((resolve,reject)=>{
      this.http.get(this.api+'/toiles/'+id).subscribe({
        next:(data: any)=>{
          if(data.status===200){
            resolve(data.result)
          }else{
            console.log("Pas d'erreur mais GET product by Id Echec : ",data.message)
            reject(data.message)
          }
        },
        error:(err)=>{
          console.log("ERROR on getProductById() : "+err)
          reject(err)
        }
      })
    })
  }

  createNewProduct(product: Product, image: File){
    return new Promise((resolve,reject)=>{
      let productData: FormData = new FormData();
      productData.append('product',JSON.stringify(product))
      productData.append('image',image)
      this.http.post(this.api+'/toiles',productData).subscribe({
        next:(data:any)=>{
          if(data.status===201){
            this.getProducts()
            resolve(data)
          }else{
            console.log("ERROR createNewProduct : ",data.message)
            reject(data.message)
          }
        },
        error:(err)=>{
          console.log("ERROR createNewProduct",err)
          reject(err)
        },
        complete:()=>{
          console.log("complete create new product")
        }
      })
    })
  }

  updateProduct(id: string, product: Product, image: File|string){
    return new Promise((resolve,reject)=>{
      let productData: FormData = new FormData();
      if(typeof image === 'string'){
        product.image = image
      }else{
        productData.append('image',image) // je ne peux pas mettre un fichier direct dans product
      }
      productData.append('product', JSON.stringify(product))
      //put
      this.http.put(this.api+'/toiles/'+id,productData).subscribe({
        next:(data:any)=>{
          if(data.status===200){
            this.getProducts()
            resolve(data)
          }else{
            console.log("ERROR createNewProduct : ",data.message)
            reject(data.message)
          }
        },
        error:(err)=>{
          console.log("ERROR createNewProduct",err)
          reject(err)
        },
        complete:()=>{
          console.log("complete create new product")
        }
      })
    })
  }

  deleteProduct(id: string){
    return new Promise((resolve,reject)=>{
      this.http.delete(this.api+'/toiles/'+id).subscribe({
        next: (data: any)=>{
          this.getProducts();
          resolve(data) // ou resolve(true)
        },
        error: (err)=>{
          console.log("ERROR DELETE PRODUCT : ",err)
          reject(err)
        },
        complete: ()=>{
          console.log("complete deleteProduct")
        }
      })
    })
  }

}
