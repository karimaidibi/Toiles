import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Artist } from './../models/artist';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  //URL de l'api stoqué comme variable d'environnement
  api = environment.api;
  // leq artistes
  artists!: Artist[]
  // observable artistes
  artists$ = new Subject<Artist[]>()

  constructor(private http: HttpClient) { }

  // Fonction qui permet de mettre à jour l'observable artiste
  emitArtists(){
    this.artists$.next(this.artists)
  }

  // Fonction qui permet de demander la liste de tous les artistes à partir de l'api de l'application backend
  getArtists(){
    this.http.get(this.api+'/artistes').subscribe({
      next:(data : any)=>{
        if(data.status===200){
          this.artists = data.result
          this.emitArtists()
        }else{
          console.log("Pas d'erreur mais GET Echec : ",data.message)
        }
      },
      error:(error)=>{
        console.log("error GET ARTISTES : ",error)
      }

    })
  }

  // Fonction qui permet de recuprer un artiste en particulier
  getArtistById(id: string){
    return new Promise((resolve,reject)=>{
      this.http.get(this.api+'/artistes/'+id).subscribe({
        next: (data: any)=>{
          if(data.status===200){
            resolve(data.result)
          }else{
            console.log("ERROR GET ARTIST BY ID : ",data.message)
            reject(data)
          }
        },
        error:(err)=>{
          console.log("ERROR GET ARTIST BY ID AFTER NEXT : ",err)
          reject(err)
        }
      })
    })
  }
}
