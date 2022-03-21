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

  emitArtists(){
    this.artists$.next(this.artists)
  }

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
}
