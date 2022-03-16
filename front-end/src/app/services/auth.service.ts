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
              ) {
                this.initAuth();
               }

  initAuth(){
    if(typeof localStorage !== "undefined"){
      let data = localStorage.getItem('auth')
      if (data) {
        let donne : any = JSON.parse(data)
        if(donne.userId && donne.token){
          this.userId = donne.userId;
          this.token = donne.token;
          this.isAuth$.next(true) // tjrs connecté
        }
      }
    }
  }

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
            this.isAuth$.next(true);
            // save authData en local afin de stocker les infos users sur son navigateur
            if(typeof localStorage !== "undefined"){
              localStorage.setItem('auth', JSON.stringify(authData))
            }
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
    this.token = null;
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('auth',"")
    }
  }

}
