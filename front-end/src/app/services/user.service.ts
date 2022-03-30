import { User } from './../models/user';
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

  //user
  user!: User
  user$ = new Subject<User>()

  constructor(
    private http: HttpClient) { }

  // fonction qui permet de mettre a jour l'observable des commandes
  emitCommandes(){
    this.commandes$.next(this.commandes)
  }

  // recuperer la liste des commandes de user en question à partir de lapi
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

  // recuperer une commande particulière de user
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

  // mettre a jour l'observable user
  emitUser(){
    this.user$.next(this.user)
  }

  // recuperer un user par son id
  getUserById(id: string){
      this.http.get(this.api+'/users/'+id).subscribe({
        next:(data: any)=>{
          if(data.status===200){
            this.user = data.result
            this.emitUser()
          }else{
            console.log(data.message)
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
  }

  // update les infos personnelles de l'utilisteur
  updateUser(id: string, userInfo : {}){
    return new Promise((resolve,reject)=>{
      //put
      this.http.put(this.api+'/users/'+id,userInfo).subscribe({
        next:(data:any)=>{
          if(data.status===200){
            resolve(data)
            this.getUserById(id)
          }else{
            console.log("ERROR updateUser : ",data.message)
            reject(data.message)
          }
        },
        error:(err)=>{
          console.log("ERROR updateUser",err)
          reject(err)
        },
        complete:()=>{
          console.log("complete updateUser")
        }
      })
    })
  }


}
