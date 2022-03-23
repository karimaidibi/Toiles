import { HttpClient } from '@angular/common/http';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Item } from './../models/item';
import { Product } from './../models/product';
import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = new Cart()
  tva = environment.tva/100
  cart$ = new Subject<Cart>()

  //URL de l'api stoqué comme variable d'environnement
  api = environment.api;

  constructor(private http : HttpClient) {
    this.initCart()
  }

  /*Une fonction qui permet de stocker le cartsur le navigateur web du client*/
  initCart(){
    if(typeof localStorage !== "undefined"){
      let data = localStorage.getItem('cart')
      if (data) {
        let donne : any = JSON.parse(data)
        if(donne){
          this.cart = donne
          this.emitCart()
        }
      }
    }
  }

  // je lappelle a chaque mise a jour du panier
  emitCart(){
    this.cart$.next(this.cart)
  }

  addToCart(product: Product){
    // verifier si le produit en parametre existe deja dans un item du panier client
    const item = this.cart.items.find(item => item.product._id === product._id)
    // si le produit existe déja dans le panier
    if(item){
      // on modifie sa quantité simplement
      item.quantity++
    }else{
      // si l'item n'existe pas dans le panier, on créer un item et on y rajoute le produit
      const item = new Item()
      item.product = product
      item.quantity = 1
      // ajouter l'item au panier
      this.cart.items.push(item)
    }
    // mettre a jour le resume du produit : quantité total etc
    this.updateCart();
  }

  updateCart(){
    this.cart.resume = {quantity: 0, costHT: 0, costTaxe: 0, costTTC: 0}
    this.cart.items.forEach((item)=>{
      // su chaque item, on va mettre a jout la quantité et les couts
      this.cart.resume.quantity += item.quantity
      this.cart.resume.costHT += item.quantity*item.product.prix
      this.cart.resume.costTaxe += this.cart.resume.costHT*this.tva
      this.cart.resume.costTTC += this.cart.resume.costHT + this.cart.resume.costTaxe
    })
    // save cart en local afin de stocker les infos users sur son navigateur
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    this.emitCart()
  }

  removeOne(product: Product){
    // verifier si le produit en parametre existe deja dans un item du panier client
    const item = this.cart.items.find(item => item.product._id === product._id)
    // si le produit existe déja dans le panier
    if(item){
      // on modifie sa quantité simplement
      if(item.quantity>1){
        item.quantity--;
      }else{
        //retirer du panier
        const index = this.cart.items.indexOf(item)
        this.cart.items.splice(index,1)
      }
      // mettre a jour le resume du produit : quantité total etc
      this.updateCart();
    }
  }

  removeMany(product: Product){
    // verifier si le produit en parametre existe deja dans un item du panier client
    const item = this.cart.items.find(item => item.product._id === product._id)
    // si le produit existe déja dans le panier
    if(item){
      //retirer du panier
      const index = this.cart.items.indexOf(item)
      this.cart.items.splice(index,1)

      // mettre a jour le resume du produit : quantité total etc
      this.updateCart();
    }
  }

  removeCart(){
    this.cart.items = []
    this.updateCart()
  }

  placeOrder(cart : Cart){
    return new Promise((resolve,reject)=>{
      this.http.post(this.api+'/commande',cart).subscribe({
        next: (data:any)=>{
          if(data.status===201){
            resolve(data)
          }else{
            console.log('ERROR WHILE Create cart : ', data.message)
            reject(data.message)
          }
        },
        error: (err)=>{
          console.log("error while create cart : ", err)
          reject(err)
        },
        complete: ()=>{
          console.log('complete post cart')
        }
      })
    })
  }

}
