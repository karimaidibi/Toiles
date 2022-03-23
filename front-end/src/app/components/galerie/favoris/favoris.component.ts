import { Product } from './../../../models/product';
import { FavorisService } from './../../../services/favoris.service';
import { Favoris } from './../../../models/favoris';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit, OnDestroy {

  favorisModel!: Favoris
  products!: Product[]

  constructor(private favorisService: FavorisService) { }

  ngOnInit(): void {
    this.initFavoris()
  }

  initFavoris() : void{
    this.favorisService.favorisModel$.subscribe({
      next: (favorisModel : Favoris)=>{
        this.favorisModel = favorisModel
        this.products = favorisModel.products
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
    this.favorisService.emitFavoris()
  }

  removeOne(productId: string){
    this.favorisService.removeOne(productId)
  }

  ngOnDestroy(): void {
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('favoris','')
    }
  }

}
