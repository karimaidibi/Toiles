import { Commande } from './../models/commande';
import { Subject } from 'rxjs';
import { Cart } from './../models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //URL de l'api stoqué comme variable d'environnement
  api = environment.api;
  // les produits
  commandes!: Commande[];
  // observable
  commandes$ = new Subject<Commande[]>()

  constructor(
    private http: HttpClient) { }

  emitCommandes(){
    this.commandes$.next(this.commandes)
  }

  getCommandes(userId: string){
    this.http.get(this.api+'/users/'+userId+'/commandes').subscribe({
      next:(data: any)=>{
        if(data.status===200){
          this.commandes = data.result
          this.emitCommandes()
        }else{
          console.log(data.message)
        }
      },
      error: (err)=>{
        console.log(err.message)
      },
      complete: ()=>{
        console.log("complete get commandes of user")
      }
    })
  }

  getCommandeById(id: string){
    return new Promise((resolve,reject)=>{
      this.http.get(this.api+'/commande/'+id).subscribe({
        next:(data: any)=>{
          if(data.status===200){
            resolve(data.result)
          }else{
            console.log(data.message)
            reject(data.message)
          }
        },
        error:(err)=>{
          reject(err.message)
        }
      })
    })
  }

  getUserById(id: string){
    return new Promise((resolve,reject)=>{
      this.http.get(this.api+'/users/'+id).subscribe({
        next:(data: any)=>{
          if(data.status===200){
            resolve(data.result)
          }else{
            console.log(data.message)
            reject(data.message)
          }
        },
        error:(err)=>{
          reject(err)
        }
      })
    })
  }


}
