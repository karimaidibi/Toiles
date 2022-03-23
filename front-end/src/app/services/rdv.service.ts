import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Rdv } from './../models/rdv';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  //URL de l'api stoqué comme variable d'environnement
  api = environment.api;
  // les rdv
  rdvs!: Rdv[];
  // observable rdv
  rdvs$ = new Subject<Rdv[]>()

  constructor(private http : HttpClient) { }

  emitRdvs(){
    this.rdvs$.next(this.rdvs)
  }

  getRdvs(){
    this.http.get(this.api+'/rdv').subscribe({
      next: (data : any)=>{
        if(data.status===200){
          this.rdvs = data.result
          this.emitRdvs()
        }else{
          console.log('ERREUR GET ECHEC : ', data.message)
        }
      },
      error: (err)=>{
        console.log("ERREUR GET RDV : ", err)
      }
    })
  }

  createNewRdv(rdv: Rdv){
    return new Promise((resolve,reject)=>{
      this.http.post(this.api+'/rdv',rdv).subscribe({
        next: (data:any)=>{
          if(data.status===201){
            this.getRdvs()
            resolve(data)
          }else{
            console.log('ERROR WHILE Create rdv : ', data.message)
            reject(data.message)
          }
        },
        error: (err)=>{
          console.log("error while create rdv : ", err)
          reject(err)
        },
        complete: ()=>{
          console.log('complete post rdv')
        }
      })
    })
  }
}
