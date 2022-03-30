import { Product } from './../models/product';
import { Favoris } from './../models/favoris';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  private api = environment.api
  favorisModel: Favoris = new Favoris() // une liste d'id de produit
  favorisModel$ = new Subject<Favoris>() // un sujet de type array de string

  constructor(private http: HttpClient) {
    this.initFavoris()
   }

  /*Une fonction qui permet de stocker les favoris le navigateur web du client*/
  initFavoris(){
    if(typeof localStorage !== "undefined"){
      let data = localStorage.getItem('favoris')
      if (data) {
        let donne : any = JSON.parse(data)
        if(donne){
          this.favorisModel = donne
          this.emitFavoris()
        }
      }
    }
  }

  // je lappelle a chaque mise a jour du panier
  emitFavoris(){
    this.favorisModel$.next(this.favorisModel)
  }

  // Fonction qui permet d'ajouter un article à la liste de favoris du client en question
  addToFavoris(productId: string, userId : string, product : Product){
    //je vérifie si le produit est déja dans le array favoris
    const favoriIndex = this.favorisModel.favoris.indexOf(productId)
    if(favoriIndex === -1){ // si le produit n'est pas déja en favoris
      // on rajoute l'id du produit au favoris
      this.favorisModel.favoris.push(productId)
      this.favorisModel.products.push(product)
      //userid
      this.favorisModel.userId = userId
      // update favoris
      this.updateFavoris()
    }
  }

  // Fonction qui permet de mettre a jour la liste des favoris du client en question et de l'envoyer vers lapi
  updateFavoris(){
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("favoris",JSON.stringify(this.favorisModel))
      this.emitFavoris()
      // save en db
      this.saveFavoris()
    }
  }

  // focntion qui permet d'initialiser le storage local des favoris sur le navigateur du client
  addToStorage(){
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("favoris",JSON.stringify(this.favorisModel))
      this.emitFavoris()
    }
  }

  // permet de supprimer un article favoris de la liste des favoris du client en question
  removeOne(productId: string){
    // je vérifie si le produit est déja dans le array favoris
    const favoriIndex = this.favorisModel.favoris.indexOf(productId)
    if(favoriIndex !== -1){
      this.favorisModel.favoris.splice(favoriIndex,1)
      this.favorisModel.products.splice(favoriIndex,1)
      this.updateFavoris()
    }
  }

  // permet d'envoyer la liste des favoris vers la base de données afin de la mettre a jour
  saveFavoris(){
    return new Promise((resolve,reject)=>{
      this.http.put(this.api+'/users/'+this.favorisModel.userId+'/favoris',this.favorisModel).subscribe({
        next:(data : any)=>{
          if(data.status ===200){
            resolve(data)
          }else{
            reject(data.message)
          }
        },
        error:(err)=>{
          console.log(err.message)
          reject(err.message)
        },
        complete:()=>{
          console.log("complete save favoris")
        }
      })
    })
  }

  // permet de recuperer la liste des favoris du client en question a partir de l'api
  getFavoris(userId: any){
    this.http.get(this.api+'/users/'+userId+'/favoris').subscribe({
      next: (data: any)=>{
        if(data.status===200){
         // remplir le favorisModel and add to storage
         this.favorisModel.userId = userId
         this.favorisModel.products = data.result.favoris
         data.result.favoris.forEach((object : any)=>{
           this.favorisModel.favoris.push(object._id)
         })
         this.addToStorage()
        }else{
          console.log("pas de favoris", data.message)
        }
      },
      error: (err)=>{
        console.log("GET FAVORIS : ",err)
      }
    })
  }

  // permet de mettre a jour la liste des favoris de touts les clients (dans la base de données)
  updateOneItemInAllFavoris( product : Product){
    const dict = {'product': product}
    return new Promise((resolve,reject)=>{
      this.http.put(this.api+'/users/favoris',dict).subscribe({
        next: (data: any)=>{
          if(data.status===200){
            resolve(data)
          }else{
            console.log(data.message)
            reject(data.message)
          }
        },
        error: (err)=>{
          console.log(err)
          reject(err)
        },
        complete : ()=>{
          console.log("complete update favoris of all concerned users")
        }
      })
    })
  }

  // permet de mettre a jour la liste des favoris de touts les clients (dans la base de données)
  deleteOneItemInAllFavoris( productId : string){
    const dict = {'productId' : productId}
    return new Promise((resolve,reject)=>{
      this.http.put(this.api+'/users/favoris/delete',dict).subscribe({
        next: (data: any)=>{
          if(data.status===200){
            resolve(data)
          }else{
            console.log(data.message)
            reject(data.message)
          }
        },
        error: (err)=>{
          console.log(err)
          reject(err)
        },
        complete : ()=>{
          console.log("complete delete favoris of all concerned users")
        }
      })
    })
  }

}
