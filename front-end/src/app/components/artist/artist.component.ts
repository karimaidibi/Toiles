import { ArtistService } from './../../services/artist.service';
import { Artist } from './../../models/artist';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, OnDestroy {

  artistSub!: Subscription
  artists!: Artist[]
  loading: boolean = true

  constructor( private artistService: ArtistService) { }

  ngOnInit(): void {
    //get artists
    this.artistSub = this.artistService.artists$.subscribe({
      next:(artists : any)=>{
        this.loading = false
        this.artists = artists
      },
      error: (err)=>{
        this.loading = true
        console.log(err)
      },
      complete :()=>{
      }
    });

    this.artistService.getArtists()
  }

  ngOnDestroy(): void {
    this.artistSub.unsubscribe()

}

}
