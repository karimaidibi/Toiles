import { AuthInfo } from './../models/auth-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Récuperer Url du backend à partir du fichier environnement
  private api = environment.api;
  // recuperer le token
  token: string | null = "" ;
  userId!: string | null;
  /* status de connexion
    - false par defaut
    - true durant la session connecté
  */
  isAuth$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient,
              ) { }

  signup(email: any, password: any, nom: any, prenom: any){
    return new Promise((resolve,reject)=>{
      this.http.post(this.api+'/users/signup',{email: email, password: password,  nom : nom , prenom: prenom}) // ça retourne un observable
      .subscribe(
        {
          next: (signupData : any)=>{
            if(signupData.status === 201){
              //authentifier l'utilisateur
              this.signin(email,password) // une promesse
              .then(()=>{
                resolve(true)
              })
              .catch((err)=>{
                console.log("ERROR L37 auth service on signin : ",err)
                reject(err)
              })
            }else{
              reject(signupData.message)
            }
          },
          error: (err)=>{
            console.log("ERROR L45 auth service on signup : ",err)
            reject(err)
          },
          complete : ()=>{
            console.log("user sign up ok")
          }
        }
      )
    })
  }

  signin(email: any, password: any){
    return new Promise((resolve,reject)=>{
      this.http.post(this.api+'/users/login', {email: email, password: password})
      .subscribe(
        {
          next : (authData: any)=>{
            this.token = authData.token
            this.userId = authData.userId
            this.isAuth$.next(true)
            resolve(true)
          },
          error: (err)=>{
            reject(err)
          },
          complete: ()=>{
            console.log("user sign in ok")
          }
        }
      )
    });
  }

  logout(){
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null
  }

}
