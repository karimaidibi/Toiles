import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private api = environment.api;

  constructor(
    private http: HttpClient,
    private router : Router
  ) { }

  // Fonction qui permet de poster le formulaire de contact vers l'api
  sendMessage(contactModel : any){
    return new Promise((resolve,reject)=>{
      this.http.post(this.api+'/contact',contactModel).subscribe({
        next: (data)=>{
          resolve(data)
        },
        error: (err)=>{
          reject(err)
        },
        complete :()=>{
          console.log('complete mail')
        }
      })
    })
  }
}
